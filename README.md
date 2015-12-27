# appframe-rethinkdb
[RethinkDB](http://rethinkdb.com/) Plugin for [Appframe](https://github.com/nodecraft/appframe.js) on NPM. This currently does not support SSL.

## API
This api is mounted at `app.r` as a [Rethinkdbdash](https://github.com/neumino/rethinkdbdash) object. Please check the project documentation for more details for usage.

### Config `rethinkdb.json5`
Config is mirrored to match the expected config for [Rethinkdbdash](https://github.com/neumino/rethinkdbdash). The only two difference are listed below:

- `ssl_files` on a server config it will read the file contents and attach to the server.ssl object
- `requireConnection` forces the plugin to delay application init until at least one connection in a pool has been made. NOTE: unpooled connections don't have this benefit YET.