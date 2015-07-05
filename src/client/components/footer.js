import {default as hg, h} from 'mercury';
import {anchor as a} from 'mercury-router';

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
