var mongodb = require('mongodb'),
    _       = require('underscore');


var serverConfigOpts = ['readPreference', 'ssl', 'slaveOk', 'poolSize',
                        'socketOptions', 'logger', 'auto_reconnect'],
    dbConfigOpts = ['strict', 'native_parser', 'forceServerObjectId', 'pkFactory',
                    'slaveOk', 'serializeFunctions', 'raw', 'recordQueryStats',
                    'reaper', 'reaperInterval', 'reaperTimeout', 'retryMiliSecond',
                    'numberOfRetries'];


exports.connect = function connect(dbName, host, port, options) {
   var db,
   server_config = _.pick(options, serverConfigOpts),
   db_config     = _.pick(options, dbConfigOpts);

   var db = new mongodb.Db(dbName, new mongodb.Server(host, port, server_config), db_config);

   return new ApiStart(db);
};

function ApiStart(db) {
   return function(collection) {
      return new Api({db: db, collection: collection})
   };
}


function parseIdOrFind(idOrFind) {
   var is_id = idOrFind isinstance String || idOrFind isinstance mongodb.ObjectID;
   return {id: is_id ? idOrFind : null, find: is_id ? null : idOrFind}
}

function storeNewObject(config) {
   var collection = config.db.collection(config.collection),
   doc = _.extend(_id: config.id, config.setData};
   collection.insert(doc);
}

function Api(config) {
   var api,
   method_mapping = {
      create: ['set'],
      get: [],
      remove: []
   };

   function assertNotStarted() {
      assert(!config._action, "create, get and remove may only be called once.");
   }

   function assertStarted() {
      assert(config._action, "create, get and remove must be called first.");
   }

   api = {
      create: function create(id) {
         assertNotStarted();

         _.extend(config,
                  {_action: 'create'},
                  {_id: id});

         return api;
      },

      get: function get(findOrId) {
         assertNotStarted();

         _.extend(config,
                  {_action: 'get'},
                  parseIdOrFind(findOrId));

         return api;
      },

      remove: function remove(findOrId) {
         assertNotStarted();

         _.extend(config,
                  {_action: 'remove'},
                  parseIdOrFind(findOrId));

         return api;
      )},

      fields: function fields(data) {
         assertStarted();
         config.returnFields = data;
         return api;
      },

      set: function set(data) {
         assertStarted();
         config.setData = data;
         return api;
      })
/*
      unset: started(function(findOrId) {
      }),

      sort: started(function(findOrId) {
      }),

      limit: started(function(findOrId) {
      }),

      skip: started(function(findOrId) {
      }),

      inc: started(function(findOrId) {
      }),

      push: started(function(findOrId) {
      }),
      pop: started(function(findOrId) {
      }),
*/
      exec: function exec(done) {
         config.onDone = done
         config.needResult = done.length > 1;

         if (config._method === 'create'){
            storeNewObject(config);
         }
         else if (config._method === 'get') {
            getObject(config)
         }
         else if (config._method === 'remove') {
            removeObject(config)
         }
      }
   };

   return api;
};

