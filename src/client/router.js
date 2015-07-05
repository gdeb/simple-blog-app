import h from 'virtual-dom/virtual-hyperscript';
import value from 'observ';
import source from 'geval/source';
import routeMap from 'route-map';


// CLICK EVENT ---------------------------------------------------------------------
function clickEvent(handler, opts = {}) {
    return function clickHandler(ev) {
        if (!opts.ctrl && ev.ctrlKey) {
            return;
        }

        if (!opts.meta && ev.metaKey) {
            return;
        }

        if (!opts.rightClick && ev.which === 2) {
            return;
        }

        handler();
        ev.preventDefault();
    };
}

// ROUTER ---------------------------------------------------------------------
var atom = value(String(document.location.pathname));

function Router() {
    var inPopState = false;
    var popstates = popstate();

    popstates(onPopState);
    atom(onRouteSet);

    return { state: atom };

    function onPopState(uri) {
        inPopState = true;
        atom.set(uri);
    }

    function onRouteSet(uri) {
        if (inPopState) {
            inPopState = false;
            return;
        }

        pushHistoryState(uri);
    }
}

function pushHistoryState(uri) {
    window.history.pushState(undefined, document.title, uri);
}

function popstate() {
    return source(function broadcaster(broadcast) {
        window.addEventListener('popstate', onPopState);

        function onPopState() {
            broadcast(String(document.location.pathname));
        }
    });
}


// ANCHOR --------------------------------------------------------------------
export function anchor(props, text) {
    var href = props.href;
    // props.href = '#';

    props['ev-click'] = clickEvent(() => pushState(href), {
        ctrl: false,
        meta: false,
        rightClick: false
    });

    return h('a', props, text);

    function pushState() {
        atom.set(href);
    }
}

export function pushState(url) {
    atom.set(url);
}

// ROUTEVIEW ----------------------------------------------------
export function init() {
    return Router().state;
}

export function render(state, opts) {
    var defn = opts;
    var args = state;
    if (args.base) {
        defn = Object.keys(defn)
            .reduce(function applyBase(acc, str) {
                acc[args.base + str] = defn[str];
                return acc;
            }, {});
    }

    var match = routeMap(defn);

    var res = match(args.route);
    if (!res) {
        throw new Error('router: no match found');
    }

    res.params.url = res.url;
    return res.fn(res.params);
}
