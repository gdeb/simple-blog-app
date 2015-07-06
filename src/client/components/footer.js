import {h} from '../mercury';
import {anchor as a} from '../router';


export function render () {
    return h('div.footer', [
        h('span.comments', "Comments"),
        h('span.about', "About this website"),
    ]);
}
