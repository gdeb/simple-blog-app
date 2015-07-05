
import {default as hg, h} from 'mercury';

import {init as initNavbar, render as renderNavbar} from './navbar.js';
import {init as initFooter, render as renderFooter} from './footer.js';
import {init as initSidebar, render as renderSidebar} from './sidebar.js';
import {init as initMainContent, render as renderMainContent} from './mainContent.js';

import {makeObservable} from '../utils.js';

const isLarge = makeObservable(() =>  window.innerWidth > 650);
const layout = makeObservable(() => window.innerWidth > 950 ? 'two-columns' : 'mobile');


export function init () {
    return hg.state({
        isLarge: isLarge,
        layout: layout,
        navbar: initNavbar(),
        sidebar: initSidebar(),
        content: initMainContent(),
        footer: initFooter(),
    });
}


export function render(state) {
    const renderer = state.layout === 'mobile' ? renderMobile : renderTwoColumns;
    return renderer(state);
}


function renderTwoColumns (state) {
    return h('div.app', {style: {
        display: 'table',
    }},[
        renderSidebar(state, {display: 'table-cell'}),
        renderMainContent(state.content, {display: 'table-cell'}),
    ]);
}

function renderMobile (state) {
    return h('div.app', {style: {
        display: 'flex',
        flexDirection: 'column',
    }},[
        renderNavbar(state.navbar),
        renderMainContent(state.content, {flexGrow: 1}),
        renderFooter(state.footer),
    ]);
}
