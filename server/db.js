const config = require('./config');

var MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the server
MongoClient.connect(config.mongoConString, function(err, db) {
  console.log("Connected successfully to server");
  db.close();
});
