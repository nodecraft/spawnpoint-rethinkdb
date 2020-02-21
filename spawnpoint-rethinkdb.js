'use strict';
const fs = require('fs');
const _ = require('lodash'),
	rethinkdbdash = require('rethinkdbdash');
const	errors = require('rethinkdbdash/lib/error');

module.exports = require('spawnpoint').registerPlugin({
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
	callback: true,
	exports: function(app, initCallback){
		// fetch SSL files, because JSON + keys != fun
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
			let initConnection = false;
			const master = app.r.getPoolMaster();

			master.on('log', console.log);
			master.on('healthy', function(active){
				if(!initConnection && !active){
					if(app.config.rethinkdb.requireConnection){
						return initCallback(app.errorCode('rethinkdb.failed_to_connect'));
					}
				}
			});

			master.on('available-size', function(size){
				if(!initConnection && size > 0){
					initConnection = true;
					if(app.config.rethinkdb.requireConnection){
						return initCallback();
					}
				}
			});
			// allowing reconnection is always an option
			if(!app.config.rethinkdb.requireConnection){
				return initCallback();
			}
		}else{
			// no guarantee can be made?
			return initCallback();
		}
	}
});