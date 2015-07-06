
import {default as hg, h} from '../mercury';

import {init as initNavbar, render as renderNavbar} from './navbar';
import {render as renderFooter} from './footer';
import {render as renderSidebar} from './sidebar';
import {init as initMainContent, render as renderMainContent} from './mainContent';

import {makeObservable} from '../utils';

const layout = makeObservable(() => window.innerWidth > 950 ? 'two-columns' : 'mobile');


export function init () {
    return hg.state({
        layout: layout,
        navbar: initNavbar(),
        content: initMainContent(),
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
