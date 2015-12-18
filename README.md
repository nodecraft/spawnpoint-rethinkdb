# appframe-rethinkdb
[RethinkDB](http://rethinkdb.com/) Plugin for [Appframe](https://github.com/nodecraft/appframe.js) on NPM. This currently does not support SSL.

## API
This api is mounted at `app.r` as a [Rethinkdbdash](https://github.com/neumino/rethinkdbdash) object. Please check the project documentation for more details for usage.

### Config `rethinkdb.json5`
Config is mirrored to match the expected config for [Rethinkdbdash](https://github.com/neumino/rethinkdbdash). The only difference is that if you define `ssl_files` on a server config it will read the file for you.