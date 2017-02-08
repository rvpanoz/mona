import FormView from 'FormView';

import Stickit from 'backbone.stickit';
import Schema from 'RecordSchema';
import CategorySchema from 'CategorySchema';
import template from '../../templates/records/record.hbs';
import moment from 'moment';

var RecordView = FormView.extend({
  template: template,
  className: 'record-form',
  wantsValidate: true,
  bindings: {
    '#input-amount': 'amount',
    '#input-payment': 'payment_method',
    '#input-kind': 'kind',
    '#input-entry-date': 'entry_date',
    '#input-category': 'category_id',
    '#input-notes': 'notes'
  },
  modelEvents: {
    'invalid': 'onValidationError',
    'sync': 'render'
  },
  collectionEvents: {
    'sync': 'render'
  },
  events: {
    'click .save': 'onSave',
    'click .cancel': 'onBack'
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
    this.ui.category.selectpicker('val', this.model.get('category_id'));
    this.ui.category.bind('hidden.bs.select', _.bind(function(e) {
      var category_id = this.ui.category.selectpicker('val');
      this.model.set('category_id', category_id);
    }, this));

    this.ui.kind.selectpicker();
    this.ui.kind.selectpicker('val', this.model.get('kind'));
    this.ui.kind.bind('hidden.bs.select', _.bind(function(e) {
      var kind = this.ui.kind.selectpicker('val');
      this.model.set('kind', kind);
    }, this));

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

  serializeData: function() {
    return {
      title: (this.model.isNew()) ? 'New record' : 'Edit record',
      categories: this.collection.toJSON()
    }
  }
});

module.exports = RecordView;
