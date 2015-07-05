import {default as hg, h} from '../mercury.js';
import K from 'kefir';

import {init as initBlog, render as renderBlog} from './blog_post.js';
import {toObservable} from '../utils.js';

const blogsList = [
    {title: "great title", content: "awesome content", date: "6 june 2015"},
    {title: "great title", content: "awesome content", date: "9 june 2015"},
    {title: "great title", content: "awesome content", date: "21 july 2015"},
    {title: "another great title", content: "so awesome content", date: "22 july 2015"},
    {title: "yet another great title", content: "beautiful and awesome content", date: "29 july 2015"},
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
    if (state === false || state.blogs === false) {
        return h('div.loading', 'loading');
    } else {
        return state.blogs.map(renderBlog);
    }
}
