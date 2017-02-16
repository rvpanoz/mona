const Marionette = require('backbone.marionette');
const RecordSchema = require('schemas/record');
const CategorySchema = require('schemas/category');
const template = require('templates/records/details.hbs');
const moment = require('moment');

var DetailItemView = Marionette.View.extend({
  template: template,
  className: 'details-preview datalist-preview',
  events: {
    'click .update': 'onUpdate',
    'click .remove': 'onRemove'
  },
  onUpdate: function(e) {
    e.preventDefault();
    return app.navigate('records/record', {
      id: this.model.get('_id')
    });
  },
  onRemove: function(e) {
    e.preventDefault();
    var id = this.model.get('_id');
    this.model.set('id', id);
    this.model.destroy({
      wait: true
    });
    return false;
  },
  setModel(model) {
    this.model = model;
  },
  serializeData: function() {
    var date_formatted = moment(new Date(this.model.get('entry_date'))).format('DD/MM/YYYY');
    var k = this.model.get('kind');
    var p = this.model.get('payment_method');

    return _.extend(this.model.toJSON(), {
      'entry_date_formatted': date_formatted,
      'kind_descr': (k == 1) ? 'Expense' : 'Income',
      'payment_method_descr': (p == 1) ? 'Cash' : 'Credit card'
    });
  }
});

module.exports = DetailItemView;
