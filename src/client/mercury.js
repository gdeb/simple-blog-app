import SingleEvent from 'geval/single';
import MultipleEvent from 'geval/multiple';
import extend from 'xtend';

import main from 'main-loop';
import BaseEvent from 'value-event/base-event';
import send from 'value-event/event';
import Delegator from 'dom-delegator';
import value from 'observ';
import struct from 'observ-struct';
import varhash from 'observ-varhash';
import diff from 'virtual-dom/vtree/diff';
import patch from 'virtual-dom/vdom/patch';
import partial from 'vdom-thunk';
import create from 'virtual-dom/vdom/create-element';
import h from 'virtual-dom/virtual-hyperscript';

const mercury = {
    // Entry
    main,
    app,

    // Base
    BaseEvent,

    // Input
    Delegator,
    channels,
    send,
    // sendValue: require('value-event/value'),
    // sendSubmit: require('value-event/submit'),
    // sendChange: require('value-event/change'),
    // sendKey: require('value-event/key'),
    // sendClick: require('value-event/click'),

    // State
    struct,
    varhash,
    value,
    state: state,

    // Render
    diff,
    patch,
    partial,
    create,
    h,
};
export default mercury;

function state(obj) {
    var copy = extend(obj);
    var $channels = copy.channels;
    var $handles = copy.handles;

    if ($channels) {
        copy.channels = mercury.value(null);
    } else if ($handles) {
        copy.handles = mercury.value(null);
    }

    var observ = mercury.struct(copy);
    if ($channels) {
        observ.channels.set(mercury.channels($channels, observ));
    } else if ($handles) {
        observ.handles.set(mercury.channels($handles, observ));
    }
    return observ;
}

function channels(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {});

    function createHandle(acc, name) {
        var handle = mercury.Delegator.allocateHandle(
            funcs[name].bind(null, context));

        acc[name] = handle;
        return acc;
    }
}

function app(elem, observ, render, opts) {
    if (!elem) {
        throw new Error(
            'Element does not exist. ' +
            'Mercury cannot be initialized.');
    }

    mercury.Delegator(opts);
    var loop = mercury.main(observ(), render, extend({
        diff: mercury.diff,
        create: mercury.create,
        patch: mercury.patch
    }, opts));

    elem.appendChild(loop.target);

    return observ(loop.update);
}
