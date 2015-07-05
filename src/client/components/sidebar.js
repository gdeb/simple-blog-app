import {default as hg, h} from '../mercury.js';

import {anchor as a, pushState} from '../router.js';

export function init () {
    return hg.state({
        gnap: "Text",
    });
}

export function render (state, style) {
    return h('div.sidebar', {style}, [
        h('div.title', {
            'ev-click': () => pushState('/'),
        }, 'Modulo Zero'),
        h('ul', [
            h('li',  a({ href: '/'}, 'recent posts')),
            h('li', a({href: '/archives'}, 'archives')),
            h('li', a({href: '/about'}, 'about')),
            h('li', 'github/linkedin'),
        ]),
    ]);
}
