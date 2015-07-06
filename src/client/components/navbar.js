import {default as hg, h} from '../mercury';

export function init() {
    return hg.state({
        channels: {
            blip: ev => console.log("blip", ev)
        }
    });
}

export function render(state) {
    return h('div.navbar', [
        h('span.menu', h('i.icono-bars')),
        h('span.title', {
            'ev-click': hg.send(state.channels.blip),
        }, "Modulo Zero"),
    ]);
}
