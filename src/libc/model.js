const Backbone = require('backbone');
const moment = require('moment');
const config = require('../config');

var backboneSync = Backbone.sync;

var Model = Backbone.Model.extend({
  sync(method, model, options) {
    options = _.extend(options, {
      url: config.api.url_dev + (_.isFunction(model.url) ? model.url() : model.url)
    });
    backboneSync(method, model, options);
  },
  parse: function(response) {
    if(this.collection) return response;
    if(!response.success || response.success == false) {
      var error = (response.error) ? response.error : '';
      this.trigger('invalid', this, error);
    } else {
      var data = this.formatFields(response.data);
      return data;
    }
  },
  formatFields(data) {
    if(!this.fieldTypes) {
      return data;
    }
    var fields = this.fieldTypes;
    for(var z in fields) {
      var type = fields[z];
      switch(type) {
        case "date":
          data[z] = moment(data[z]).format('DD/MM/YYYY');
        break;
        case "float":
          data[z] = parseFloat(data[z]).toFixed(2);
        break;
      }
    }
    return data;
  }
});

module.exports = Model;
