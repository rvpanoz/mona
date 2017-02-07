import Marionette from 'backbone.marionette';
import Stickit from 'backbone.stickit';
import Schema from 'RecordSchema';
import CategorySchema from 'CategorySchema';
import template from '../../templates/records/record.hbs';
import moment from 'moment';

var RecordView = Marionette.View.extend({
  template: template,
  className: 'record-form',
  bindings: {
    '#input-amount': {
      observe: 'amount'
    },
    '[name="input-payment"]': {
      observe: 'payment_method'
    },
    '[name="input-kind"]': {
      observe: 'kind'
    },
    '#input-entry-date': {
      observe: 'entry_date'
    },
    '#input-category': {
      observe: 'category_id'
    },
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
    kind: '#input-kind',
    category: '#input-category',
    entryDate: '#input-entry-date'
  },
  initialize: function(params) {
    this.model = new Schema.Record();
    this.collection = new CategorySchema.Categories();
    this.collection.fetch({
      success: _.bind(function() {
        if(params.id) {
          this.model.set('_id', params.id);
          this.model.fetch();
        }
      }, this)
    });
    this.listenTo(this.model, 'invalid', this.onValidationError, this);
  },
  onDomRefresh() {

  },
  onRender: function() {
    this.ui.category.selectpicker();
    this.ui.kind.selectpicker();
    this.ui.category.selectpicker('val', this.model.get('category_id'));

    //cateogry_id
    this.ui.category.bind('hidden.bs.select', _.bind(function(e) {
      var category_id = this.ui.category.selectpicker('val');
      this.model.set('category_id', category_id);
    }, this));

    //** kind
    this.ui.kind.selectpicker('val', this.model.get('kind'));
    this.ui.kind.bind('hidden.bs.select', _.bind(function(e) {
      var kind = this.ui.kind.selectpicker('val');
      this.model.set('kind', kind);
    }, this));

    //** entry_date
    this.ui.entryDate.datepicker({
      language: 'en',
      selectOtherMonths: true,
      dateFormat: 'dd/mm/yyyy',
      autoClose: true,
      onSelect: _.bind(function(d, fd) {
        this.model.set('entry_date', d);
      }, this)
    });

    if (this.model.isNew()) {
      this.model.set('entry_date', moment(new Date()).format('DD/MM/YYYY'));
    } else {
      var d = this.model.get('entry_date');
      this.ui.entryDate.val(moment(d).format('DD/MM/YYYY'));
    }

    //stickit
    this.stickit();
  },
  onSave: function(e) {
    e.preventDefault();
    this.model.save(null, {
      success: _.bind(this.onBack, this)
    });
  },
  onValidationError: function(model) {
    var errors = model.validationError;
    var groups = this.$('.form-group');

    //remove has-error
    groups.removeClass('has-error');

    _.each(errors, function(err) {
      var element = this.$('.form-group-' + err.field);
      if (element) {
        element.addClass('has-error');
      }
    }, this);

    return _.isEmpty(errors) ? void 0 : errors;
  },
  onBack: function(e) {
    return app.navigate('records/main');
  },
  serializeData: function() {
    return {
      title: (this.model.isNew()) ? 'New record' : 'Edit record',
      categories: this.collection.toJSON()
    }
  }
});

module.exports = RecordView;
