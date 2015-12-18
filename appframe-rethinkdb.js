'use strict';
var _ = require('lodash'),
	fs = require('fs'),
	rethinkdbdash = require('rethinkdbdash'),
	errors = require('rethinkdbdash/lib/error');

module.exports = require('appframe')().registerPlugin({
	dir: __dirname,
	name: "RethinkDB",
	namespace: "rethinkdb",
	errors: {
		'rethinkdb.driver_error': errors.ReqlDriverError,
		'rethinkdb.server_error': errors.ReqlServerError,
		'rethinkdb.runtime_error': errors.ReqlRuntimeError,
		'rethinkdb.compile_error': errors.ReqlCompileError,
		'rethinkdb.client_error': errors.ReqlClientError
	},
	exports: function(app, callback){
		if(app.config.rethinkdb.servers){
			app.config.rethinkdb.servers.map(function(server){
				if(server.ssl_files && typeof(server.ssl_files) === 'object'){
					if(!server.ssl){
						server.ssl = {};
					}
					_.each(server.ssl_files, function(file, key){
						server.ssl[key] = fs.readFileSync(file, 'utf8');
					});
				}
				return server;
			});
		}
		app.r = rethinkdbdash(app.config.rethinkdb);
		if(app.config.rethinkdb.pool !== false){
			var master = app.r.getPoolMaster();
			master.on('log', app.warn);
		}
	}
});
