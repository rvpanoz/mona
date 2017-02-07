const Marionette = require('backbone.marionette');
const Schema = require('CategorySchema');
const Stickit = require('backbone.stickit');
const template = require('../../templates/categories/category.hbs');

var CategoryView = Marionette.View.extend({
  template: template,
  className: 'category-form',
  bindings: {
    '#input-name': 'name',
    '#colorpickerr': 'color'
  },
  ui: {
    name: '#input-name',
    colorpicker: '#colorpicker'
  },
  modelEvents: {
    'sync': 'render',
    'change': 'onModelChange'
  },
  events: {
    'click .save': 'onSave',
    'click .cancel': 'onBack'
  },
  initialize: function(params) {
    this.model = new Schema.Category();
    if (params.id) {
      this.model.set('_id', params.id);
      this.model.fetch();
    }
    this.listenTo(this.model, 'invalid', this.onValidationError, this);
  },
  onRender: function() {
    this.stickit();
  },
  onSave: function(e) {
    if (e) {
      e.preventDefault();
    }
    this.model.save(null, {
      success: _.bind(this.onEventSaveCallback, this)
    });
  },
  onModelChange: function(model) {},
  onEventSaveCallback: function(model) {
    app.navigate('categories/main');
    return false;
  },
  onValidationError: function(model) {
    var errors = model.validationError;
    return _.isEmpty(errors) ? void 0 : errors;
  },
  onBack: function(e) {
    if (e) {
      e.preventDefault();
    }
    app.navigate('categories/categories');
    return false;
  },
  serializeData: function() {
    return {
      title: (this.model.isNew()) ? 'New category' : 'Edit category'
    }
  }
});

module.exports = CategoryView;
