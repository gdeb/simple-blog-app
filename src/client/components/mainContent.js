import {default as hg, h} from 'mercury';
import {default as initRouter, render as renderRouter} from 'mercury-router';

import {init as initBlogs, render as renderBlogs, fetchBlogs} from './blog_list.js';


export function init () {
    const state = {
        route: initRouter(),
    };
    if (state.route() === '/blogs') {
        state.blogs = initBlogs(fetchBlogs());
    }
    return hg.state(state);
}

export function render (state, style) {
    return h('div.content', {style}, renderRouter(state, {
        '/': () => h('h1', ['Home']),
        '/animals': () => h('h1', ['Animals']),
        '/blogs': () => renderBlogs(state.blogs),
        '/animals/:id': params => h('h1', ['Animals ' + params.id]),
    }));
}
