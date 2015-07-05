
Simple blog application
========================

This is a simple project, just for fun and to experiment with javascript technologies. The goal is to obtain a project such that:
* full javascript, because I like it
* ES2015, because this is the future, and I believe it is a good improvement on ES5
* serverside rendering, because it is important for SEO and user experience
* maintainable: good conventions, good separation of concerns, ...


The blog itself will be (if all goes well):
* a SPA (single page application), with client side routing
*  with so-called "isomorphic" applications: having as much code shared between the server and the client.
* as light as possible.  No jquery, no bootstrap, no underscore.  First goal is to get it under
30kb minified/gzipped (approximately jquery size, alone)


Right now, the technology stack looks like:
* nodejs/iojs for server code
* sqlite3 for db
* mercury for client rendering (based on virtual-dom)
* kefir for FRP support


To do
-------------
* find a way to have hot reload of javascript code
* add a favicon, and use koa-favicon to serve it
