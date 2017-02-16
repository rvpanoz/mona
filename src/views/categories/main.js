const Marionette = require('backbone.marionette');
const Schema = require('schemas/category');
const template = require('templates/categories/main.hbs');
const CategoriesView = require('./categories');
const DetailsView = require('./details');

var CategoriesLayoutView = Marionette.View.extend({
  template: template,
  title: 'Categories',
  regions: {
    categoriesRegion: '#categories-content'
  },
  childViewTriggers: {
    'fetch:categories': 'child:fetch:categories',
    'model:removed': 'child:model:removed',
    'model:selected': 'child:model:selected'
  },
  onRender: function() {
    var categoriesView = new CategoriesView();
    this.showChildView('categoriesRegion', categoriesView);
  },
  onChildModelSelected: function(e, model) {},
  onChildModelRemoved: function(model) {},
  serializeData: function() {
    return {
      title: this.title
    }
  },
  onChildFetchCategories: function(collection) {
    app.triggerMethod("sidebar:switch", "actions");
  },
});

module.exports = CategoriesLayoutView;
