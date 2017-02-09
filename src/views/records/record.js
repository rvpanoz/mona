import FormView from 'FormView';

import Stickit from 'backbone.stickit';
import Schema from 'RecordSchema';
import CategorySchema from 'CategorySchema';
import template from '../../templates/records/record.hbs';
import moment from 'moment';

var RecordView = FormView.extend({
  template: template,
  className: 'record-form',
  parentUrl: 'records/main',
  wantsValidate: true,
  bindings: {
    '#input-amount': 'amount',
    "[name='input-payment']": 'payment_method',
    "[name='input-kind']": 'kind',
    '#input-entry-date': 'entry_date',
    '#input-category': 'category_id',
    '#input-notes': 'notes'
  },
  modelEvents: {
    'invalid': 'onValidationError',
    'sync': 'render'
  },
  collectionEvents: {
    'sync': 'onSync'
  },
  events: {
    'click .save': 'onSave',
    'click .cancel': 'onBack',
    'click .add-category': 'onAddCategory'
  },
  ui: {
    amount: '#input-amount',
    kind: '#input-kind',
    category: '#input-category',
    entryDate: '#input-entry-date'
  },
  initialize: function() {
    this.model = new Schema.Record();
    this.collection = new CategorySchema.Categories();
    this.collection.fetch({
      success: _.bind(function() {
        if(this.params.id) {
          this.model.set('_id', this.params.id);
          this.model.fetch();
        }
      }, this)
    });
    RecordView.__super__.initialize.call(this, arguments);
  },
  onRender: function() {
    RecordView.__super__.onRender.call(this, arguments);

    this.ui.category.selectpicker();

    //** entry_date
    this.ui.entryDate.datepicker({
      language: 'en',
      dateFormat: 'dd/mm/yyyy',
      autoClose: true,
      onSelect: _.bind(function(fd, d) {
        this.model.set('entry_date', fd);
      }, this)
    });
  },
  onAddCategory(e) {
    e.preventDefault();
    app.navigate('categories/category');
    return false;
  },
  onSync() {
    this.render();
    if(!this.collection.length) {
      var alertView = require('../common/alert');
      var activeAlert = new alertView({
        alertType: 'alert-danger',
        message: "You do not have any categories"
      });
      activeAlert.render();
    }
  },
  serializeData: function() {
    return {
      title: (this.model.isNew()) ? 'New record' : 'Edit record',
      categories: this.collection.toJSON()
    }
  }
});

module.exports = RecordView;
