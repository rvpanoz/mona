const Backbone = require('backbone');
const moment = require('moment');
const config = require('../config');

var backboneSync = Backbone.sync;

var Collection = Backbone.Collection.extend({
  sync(method, collection, options) {
    options = _.extend(options, {
      url: config.api.url_dev + (_.isFunction(collection.url) ? collection.url() : collection.url)
    });
    backboneSync(method, collection, options);
  },
  parse(response) {
    return response.data;
  }
});

module.exports = Collection;
