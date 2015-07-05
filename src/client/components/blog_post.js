import {default as hg, h} from '../mercury.js';

export function init ({title, content}) {
    return hg.state({
        title: hg.value(title),
        content: hg.value(content),
    });
}

export function render (state) {
    return h('div.blog', [
        h('div.date', state.date),
        h('h1.title', state.title),
        h('div.post', state.content),
    ]);
}
