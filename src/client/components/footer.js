import {default as hg, h} from '../mercury.js';
import {anchor as a} from '../router.js';

export function init () {
    return hg.state({
        gnap: "Text",
    });
}

export function render (state) {
    return h('div.footer', [
        h('span.comments', "Comments"),
        h('span.about', "About this website"),
    ]);
}
