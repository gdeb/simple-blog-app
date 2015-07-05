import {default as hg, h} from '../mercury.js';
import {init as initRouter, render as renderRouter} from '../router.js';

import {init as initBlogs, render as renderBlogs, fetchBlogs} from './blog_list.js';


export function init () {
    const state = {
        route: initRouter(),
        blogs: initBlogs(fetchBlogs()),
    };
    return hg.state(state);
}

export function render (state, style) {
    return h('div.content', {style}, renderRouter(state, {
        '/': () => renderBlogs(state.blogs),
        '/archives': () => h('h1', ['Archives']),
        '/about': () => h('h1', ['About']),
        '/animals/:id': params => h('h1', ['Animals ' + params.id]),
    }));
}
