import {default as hg, h} from 'mercury';

export function init ({title, content}) {
    return hg.state({
        title: hg.value(title),
        content: hg.value(content),
    });
}

export function render (state) {
    return h('div.blog', [
        h('h1.title', state.title),
        h('div.post', state.content),
    ]);
}
