import fs from "fs";
import koa from 'koa';
import gzip from 'koa-gzip';
import serve from 'koa-static';
import Router from 'koa-router';
import Mustache from 'mustache';

import "./db";
import {TEMPLATES_DIR, STATIC_DIR, PORT, ENV} from './config.js';
import {logger} from './middleware.js';

const app = koa();
const router = new Router();

router.get('/', function *() {
    this.body = Mustache.render(html_response, {object: "youup", stuff: "nsrt"});
});

if (ENV === 'prod') {
    app.use(gzip());
}

// logger
app.use(logger);


var html_response = fs.readFileSync(TEMPLATES_DIR + 'home.html', "utf8");
const not_found = fs.readFileSync(TEMPLATES_DIR + '404.html', "utf8");

app.use(serve(STATIC_DIR));

// response
app.use(router.routes());
app.use(function *(){
    this.body = Mustache.render(html_response, {object: "youup", stuff: "nsrt"});
  // this.status = 404;
  // this.body = Mustache.render(not_found, {object: "yop", stuff: "nsrt"});
});

console.log('port', PORT);
app.listen(PORT, function () {
    console.log('server started on port', PORT);
});


// var serve = require('koa-static');
// var koa = require('koa');
// var app = koa();
//
// // $ GET /package.json
// app.use(serve('.'));
//
// // $ GET /hello.txt
// app.use(serve('test/fixtures'));
//
// // or use absolute paths
// app.use(serve(__dirname + '/test/fixtures'));
//
// app.listen(3000);
//
// console.log('listening on port 3000');
