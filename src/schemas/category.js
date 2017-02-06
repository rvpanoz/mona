const Model = require('../libc/model');
const Collection = require('../libc/collection');
const moment = require('moment');

var Category = Model.extend({
  idAttribute: '_id',
  url: function() {
    if(this.isNew()) {
      return '/data/categories';
    } else {
      return '/data/categories/' + this.get('_id');
    }
  },
  defaults: {
    name: null,
    updated_at: new Date(),
    created_at: new Date()
  },
  validate: function(attrs) {
    var errors = [];
    if (!attrs.name || _.isEmpty(attrs.name)) {
      errors.push({
        field: 'name',
        error: 'Field name is required'
      });
    }
    return _.isEmpty(errors) ? void 0 : errors;
  }
});

var Categories = Collection.extend({
  model: Category,
  url: function() {
    return '/data/categories';
  }
});

module.exports = {
  Category: Category,
  Categories: Categories
}
