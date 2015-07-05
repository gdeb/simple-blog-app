
import 'colors';

export function raw_logger (...args) {
    console.log(...args);
}

export function make_logger (category, color) {
    return function (...args) {
        let c = '[' + category + ']';
        raw_logger(c[color], ...args);
    };
}

const logger = {
    debug: make_logger('DEBUG', 'white'),
    info: make_logger('INFO', 'green'),
    warning: make_logger('WARN', 'yellow'),
    error: make_logger('ERROR', 'red'),
};


export default logger;
