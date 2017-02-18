const FormView = require('libc/formView');
const Schema = require('schemas/category');
const template = require('templates/categories/category.hbs');

var CategoryView = FormView.extend({
  template: template,
  className: 'category-form',
  parentUrl: 'categories/main',
  wantsValidate: true,
  bindings: {
    '#input-name': 'name',
    '#colorpickerr': 'color'
  },
  ui: {
    name: '#input-name',
    colorpicker: '#colorpicker'
  },
  modelEvents: {
    'sync': 'render'
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

    CategoryView.__super__.initialize.call(this, arguments);
  },
  onRender: function() {
    CategoryView.__super__.onRender.call(this, arguments);
  },
  serializeData: function() {
    return {
      title: (this.model.isNew()) ? 'New category' : 'Edit category'
    }
  }
});

module.exports = CategoryView;
