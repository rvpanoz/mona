const Marionette = require('backbone.marionette');
const Schema = require('../../schemas/category');
const template = require('../../templates/categories/browse-categories.hbs');
const CategoryItemView = require('./category-item');

var Categories = Marionette.CompositeView.extend({
  title: 'Your categories',
  template: template,
  childView: CategoryItemView,
  childViewContainer: '.categories-items',
  childViewTriggers: {
    'select:model': 'child:select:model'
  },
  collectionEvents: {
    'sync': 'render'
  },
  events: {
    'click a.btn-new': 'onNew',
    'click a.btn-update': 'onUpdate'
  },
  ui: {
    'categories-table': '.categories-table'
  },
  initialize: function() {
    this.collection = new Schema.collection();
    this.collection.fetch();
  },

  onBeforeRender: function() {
    app.triggerMethod("sidebar:switch", "actions");
  },

  getSelectedModels: function() {
    var selected = _.filter(this.collection.models, function(model) {
      return model.get('_selected') == true;
    });
    return selected;
  },

  onChildSelectModel: function(model) {
    this._selected = [];
    this._selected = this._getSelectedModels();
    if(this._selected.length > 1) {
      this.getUI('actions').hide();
      return;
    }
    this.getUI('actions').toggle();
  },

  serializeData: function() {
    var style = (this.collection.length == 0) ? 'display:none' : 'display:block';
    return _.extend(this.collection.toJSON(), {
      title: this.title,
      records: {
        style: style
      },
      stats: {
        total: this.collection.length
      }
    });
  }
});

module.exports = Categories;