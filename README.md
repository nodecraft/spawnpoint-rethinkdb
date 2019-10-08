# spawnpoint-rethinkdb
[RethinkDB](http://rethinkdb.com/) Plugin for [Spawnpoint](https://github.com/nodecraft/spawnpoint.js) on NPM. This currently does not support SSL.

[![npm version](https://badge.fury.io/js/spawnpoint-rethinkdb.svg)](https://badge.fury.io/js/spawnpoint-rethinkdb)
[![dependencies Status](https://david-dm.org/nodecraft/spawnpoint-rethinkdb/status.svg)](https://david-dm.org/nodecraft/spawnpoint-rethinkdb)
[![Actions Status](https://github.com/Syed-Umair/spawnpoint-rethinkdb/workflows/Node CI/badge.svg)](https://github.com/Syed-Umair/spawnpoint-rethinkdb/actions)
[![Greenkeeper badge](https://badges.greenkeeper.io/nodecraft/spawnpoint-rethinkdb.svg)](https://greenkeeper.io/)

## API
This api is mounted at `app.r` as a [Rethinkdbdash](https://github.com/neumino/rethinkdbdash) object. Please check the project documentation for more details for usage.

### Config `rethinkdb.json5`
Config is mirrored to match the expected config for [Rethinkdbdash](https://github.com/neumino/rethinkdbdash). The only two difference are listed below:

- `ssl_files` on a server config it will read the file contents and attach to the server.ssl object
- `requireConnection` forces the plugin to delay application init until at least one connection in a pool has been made. NOTE: unpooled connections don't have this benefit YET.
