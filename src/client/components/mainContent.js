import {default as hg, h} from '../mercury';
import {init as initRouter, render as renderRouter} from '../router';
import {init as initBlogs, render as renderBlogs, fetchBlogs} from './blog_list';


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
        '/demos': () => h('h1', ['Demos']),
        '/about': () => h('h1', ['About']),
        '/article/:title': params => h('h1', ['Article ' + params.title]),
    }));
}
