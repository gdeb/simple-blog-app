import {default as hg, h} from '../mercury.js';
import {anchor as a} from '../router.js';


export function render () {
    return h('div.footer', [
        h('span.comments', "Comments"),
        h('span.about', "About this website"),
    ]);
}
