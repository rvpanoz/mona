const Backbone = require('backbone');
const moment = require('moment');
const config = require('../config');

var backboneSync = Backbone.sync;

var Model = Backbone.Model.extend({
  sync(method, model, options) {
    options = _.extend(options, {
      url: config.api.url + (_.isFunction(model.url) ? model.url() : model.url)
    });
    backboneSync(method, model, options);
  },
  parse: function(response) {
    if(this.collection) return response;
    if(!response.success || response.success == false) {
      var error = (response.error) ? response.error : '';
      this.trigger('invalid', this, error);
    } else {
      return response.data;
    }
  }
});

module.exports = Model
