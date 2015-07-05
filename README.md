Test

http://developer.telerik.com/featured/choose-es6-modules-today/

browser-sync in dev mode
vantage (https://github.com/dthree/vantage) support for repl

have dev and production mode

in dev mode, update to scss, or html, or js => reload corresponding asset

remove config.json and use config.js instead
_tmp/
  public/  <-- will be destroyed, recreated, ...
  dbfile

client/
resources/
  scss/
  templates/
  images/

server/
  db/
    sql/
      user.sql
      session.sql
      ...
    index.js
    user.js
    session.js
  routes/
    home.js
  index.js
  server.js
  middleware.js
  session.js

strategy:

make a prepare.js script in js
put config in package.json
