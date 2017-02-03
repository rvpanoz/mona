const Backbone = require('backbone');
const moment = require('moment');
const config = require('../config');

var backboneSync = Backbone.sync;

var Collection = Backbone.Collection.extend({
  sync(method, model, options) {
    options = _.extend(options, {
      url: config.api.url + (_.isFunction(model.url) ? model.url() : model.url)
    });
    backboneSync(method, model, options);
  },
  parse(response) {
    return response.data;
  }
});

module.exports = Collection
