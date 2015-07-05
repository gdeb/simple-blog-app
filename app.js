#!/usr/bin/env babel-node --
"use strict";

import program from 'commander';
import nodemon from 'nodemon';
import fs from 'fs';

import {make_folder, remove_folder, exec_cmd, spawn} from './tools/cli_utils.js';
import {make_logger, raw_logger} from './tools/logger.js';

const {config, version} = require('./package.json');
const BUILD = config.build_folder;
const logger = make_logger('overseer', 'yellow');

// Command line arguments
//----------------------------------------------------------------------------------
program
    .version(version)
    .option('-c --clean', 'Clean the build folder')
    .option('-p, --prepare_dev', 'Prepare the application (development mode)')
    .option('-P, --prepare_prod', 'Prepare the application (production mode)')
    .option('-s, --start', 'start the development server')
    .option('-S, --Start', 'start the production server')
    .option('-b --browsersync', 'start browsersync server (only dev mode)')
    .option('-d --develop', 'Start the server in develop mode')
    .option('--production', 'Start the server in production mode')
    .option('-t --test', 'Run the test suite')
    .option('-m --migrate', 'Run the migrations')
    .option('--demo', 'Add demo data')
    .parse(process.argv);


// Commands
//----------------------------------------------------------------------------------
function compile_styles (destination) {
    return `scss --cache-location _build resources/scss/main.scss ${destination}/main.css`;
}

function minify_css () {
    return 'cleancss _build/prod/tmp/main.css -o _build/prod/static/css/main.css';
}

function compile_js (file) {
    if (file) {
        return `babel -o _build/client/${file} src/client/${file} -s`;
    } else {
        return `babel -d _build/ src/ -s`;
    }
}

function browserify (destination) {
    return `browserify --full-paths _build/client -o ${destination}/app.js`;
}

function uglify_js () {
    return "node_modules/.bin/uglifyjs _build/prod/tmp/app.js --screw-ie8 -c -m -o _build/prod/static/js/app.js";
}

function start_server (options) {
    return `babel-node src/server --config ${__dirname}/package.json --env ${options.env}`;
}

function browsersync () {
    return `node_modules/.bin/browser-sync start --proxy localhost:${config.port} \
                  --files _build/dev/static/css/*.css,_build/dev/static/js/*.js \
                  --no-open --no-ui --no-online --port ${config.port + 1}`;
}

// Utility function
//----------------------------------------------------------------------------------
function define_task (name, callback) {
    if (name in program) {
        callback();
    }
}

// Tasks
//----------------------------------------------------------------------------------
define_task('clean', function () {
    logger('cleaning build folder ' + BUILD);
    remove_folder(BUILD);
});

define_task('prepare_dev', function () {
    logger('creating folder structure');
    make_folder('_build/client/', raw_logger);
    make_folder('_build/dev/', raw_logger);
    make_folder('_build/dev/static/css/', raw_logger);
    make_folder('_build/dev/static/js/', raw_logger);

    logger('compiling resources/scss into _build/dev/static/css');
    exec_cmd(compile_styles('_build/dev/static/css'), raw_logger);

    logger('compiling ES6 files to ES5');
    exec_cmd(compile_js(), raw_logger);

    logger('bundling _build/client into _build/dev/static/js/app.js');
    exec_cmd(browserify('_build/dev/static/js'), raw_logger);
});

define_task('prepare_prod', function () {
    logger('creating folder structure');
    make_folder('_build/client/', raw_logger);
    make_folder('_build/prod/tmp', raw_logger);
    make_folder('_build/prod/static/css/', raw_logger);
    make_folder('_build/prod/static/js/', raw_logger);

    logger('compiling resources/scss into _build/prod/tmp');
    exec_cmd(compile_styles('_build/prod/tmp'), raw_logger);

    logger('minifying css in _build/prod/static/css');
    exec_cmd(minify_css(), raw_logger);

    logger('compiling ES6 files to ES5');
    exec_cmd(compile_js(), raw_logger);

    logger('bundling _build/client into _build/prod/tmp');
    exec_cmd(browserify('_build/prod/tmp'), raw_logger);

    logger('uglifying client js');
    exec_cmd(uglify_js(), raw_logger);

});

define_task('start', function () {
    logger('starting server in DEV mode');
    spawn(start_server({env: 'dev'}), make_logger('server', 'cyan'));
});

define_task('Start', function () {
    logger('starting server in PROD mode');
    spawn(start_server({env: 'prod'}), make_logger('server', 'cyan'));
});

define_task('browsersync', function () {
    logger('starting browsersync server');
    spawn(browsersync(), make_logger('browsersync', 'cyan'));
});


define_task('develop', function () {
    logger('starting server (with nodemon)');
    nodemon({
        exec: start_server({env: 'dev'}),
        watch: __dirname + '/src/server',
        stdout: false,
    });
    nodemon.on('restart', function () {
        logger('restarting server');
    });

    const server_logger = make_logger('server', 'cyan');
    nodemon.on('stdout', function (data) {
        server_logger(data.slice(0, data.length - 1).toString());
    });

    nodemon.on('stderr', function (data) {
        server_logger(data.slice(0, data.length - 1).toString());
    });

    logger('starting browsersync server');
    spawn(browsersync(), make_logger('browsersync', 'cyan'));

    logger('watching scss in resources/scss');
    fs.watch(__dirname +  '/resources/scss' , function () {
        logger('compiling scss');
        exec_cmd(compile_styles('_build/dev/static/css'), raw_logger);
    });

    logger('watching /src/client');
    fs.watch(__dirname + '/src/client', {recursive: true}, function (_, name) {
        logger('compiling', name);
        exec_cmd(compile_js(name), raw_logger);

        logger('browserifying');
        exec_cmd(browserify('_build/dev/static/js'), raw_logger);
    });
});
