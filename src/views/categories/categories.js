const Marionette = require('backbone.marionette');
const Schema = require('CategorySchema');
const template = require('../../templates/categories/categories.hbs');
const CategoryItemView = require('./item');

var Categories = Marionette.CompositeView.extend({
  title: 'Your categories',
  template: template,
  childView: CategoryItemView,
  childViewContainer: '.categories-items',
  childViewTriggers: {
    'model:selected': 'child:selected:model'
  },
  collectionEvents: {
    'sync': 'onSync'
  },
  events: {
    'click a.btn-new': 'onNew',
    'click a.btn-update': 'onUpdate'
  },
  ui: {
    'categories-table': '.categories-table'
  },
  initialize: function() {
    this.collection = new Schema.Categories();
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
  onSync() {
    this.triggerMethod('fetch:records', this.collection);
    this.render();
  },
  onChildSelectedModel: function(e, model) {
    var target = e.currentTarget;
    var selected = this.getSelectedModels();
    var hide = selected.length > 1;
    var index = $(e.currentTarget)[0].rowIndex;
    this.getUI('categories-table').find('tr').removeClass('selected');
    $(target).toggleClass('selected');
    this.triggerMethod('toggle:details', hide);
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
