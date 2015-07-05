import {h} from '../mercury.js';
import {pushState} from '../router.js';

export function render (state) {
    return h('div.blog', [
        h('div.date', state.date),
        h('h1.title', {
            'ev-click': () => pushState('/article/' + state.encoded_title)
        }, state.title),
        h('div.post', state.content),
    ]);
}
