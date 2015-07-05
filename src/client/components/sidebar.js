import {default as hg, h} from 'mercury';

import {anchor as a} from 'mercury-router';

export function init () {
    return hg.state({
        gnap: "Text",
    });
}

export function render (state, style) {
    return h('div.sidebar', {style}, [
        h('div.title', 'Modulo Zero'),
        h('ul', [
            h('li', 'recent posts'),
            h('li', 'archives'),
            h('li', 'about'),
            h('li', 'github/linkedin'),
        ]),
    ]);
}
