import {default as hg, h} from '../mercury.js';
import K from 'kefir';

import {init as initBlog, render as renderBlog} from './blog_post.js';
import {toObservable} from '../utils.js';

const blogsList = [
    {title: "great title", content: "awesome content"},
    {title: "great title", content: "awesome content"},
    {title: "great title", content: "awesome content"},
    {title: "another great title", content: "so awesome content"},
    {title: "yet another great title", content: "beautiful and awesome content"},
];

const blogs =  toObservable(K.sequentially(2000, [blogsList]), false);

export function fetchBlogs () {
    return blogs;
}

export function init (blogs) {
    return hg.state({
        blogs: blogs,
    });
}

export function render (state) {
    console.log(state);
    if (state === false || state.blogs === false) {
        return h('div.loading', 'loading');
    } else {
        return state.blogs.map(renderBlog);
    }
}
