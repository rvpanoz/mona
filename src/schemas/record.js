const $ = require('jquery');
const Model = require('../libc/model');
const Collection = require('../libc/collection');
const config = require('../config');

var date = new Date();

var Record = Model.extend({
  idAttribute: '_id',
  url: function () {
    if (this.isNew()) {
      return '/data/records';
    } else {
      return '/data/records/' + this.get('_id');
    }
  },
  defaults: {
    _selected: false,
    amount: null,
    category_id: null,
    payment_method: 1,
    kind: 1,
    entry_date: date,
    updated_at: date,
    created_at: date
  },
  fieldTypes: {
    amount: 'float',
    category_id: 'string',
    payment_method: 'int',
    kind: 'int',
    entry_date: 'date',
    updated_at: 'date',
    created_at: 'date'
  },
  validate(attrs) {
    var errors = [];

    if (!attrs.amount) {
      errors.push({
        field: 'amount',
        error: 'Field amount is required'
      });
    }

    if (!attrs.category_id) {
      errors.push({
        field: 'category_id',
        error: 'Field category_id is required'
      });
    }

    if (!attrs.entry_date) {
      errors.push({
        field: 'entry_date',
        error: 'Field entry_date is required'
      });
    }

    return _.isEmpty(errors) ? void 0 : errors;
  }
});

var Records = Collection.extend({
  model: Record,
  url: function () {
    return '/data/records';
  },
  sortField: null,
  sortDir: 1,
  pages: 1,
  page: 1,
  parse: function (response) {
    this.allRecords = response.allData;
    this.total = response.total;
    this.pages = response.pages;
    this.page = response.page;
    _.each(response.data, function (record) {
      record.amount = record.amount.toFixed(2);
    });
    return response.data;
  },
  comparator: function (m1) {
    var field = this.sortField;
    var dir = this.sortDir;
    return (dir == -1) ? -m1.get(field) : m1.get(field);
  },
  getAllExpenses: function () {
    return _.filter(this.allRecords, function (model) {
      return model.kind == 1;
    });
  },
  getAllIncomes: function () {
    return _.filter(this.allRecords, function (model) {
      return model.kind == 2;
    });
  }
});

module.exports = {
  Record: Record,
  Records: Records
}
