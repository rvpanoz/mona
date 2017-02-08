const Marionette = require('backbone.marionette');
const Schema = require('CategorySchema')
const template = require('../../templates/categories/main.hbs')
const CategoriesView = require('./categories');
const DetailsView = require('./details');

var CategoriesLayoutView = Marionette.View.extend({
  template: template,
  title: 'Categories',
  regions: {
    categoriesRegion: '#categories-content',
    detailsRegion: '#details-content'
  },
  childViewTriggers: {
    'fetch:categories': 'child:fetch:categories',
    'model:selected': 'child:model:selected',
    'toggle:details': 'child:toggle:details'
  },
  onRender: function() {
    var categoriesView = new CategoriesView();
    this.showChildView('categoriesRegion', categoriesView);
  },
  onChildToggleDetails: function(hide) {
    var detailsView = this.getChildView('detailsRegion');
  },
  onChildModelSelected: function(e, model) {
    var detailsView = this.getChildView('detailsRegion');

    detailsView.setModel(model);
    detailsView.render();
  },
  serializeData: function() {
    return {
      title: this.title
    }
  },
  onChildFetchCategories: function(collection) {
    var detailsView = this.getChildView('detailsRegion');

    this.collection = collection;
    if(!detailsView && this.collection.length) {
      var model = this.collection.first();
      model.set('_selected', true);
      this.showChildView('detailsRegion', new DetailsView({
        model: model
      }));
    }
    app.triggerMethod("sidebar:switch", "actions");
  },
});

module.exports = CategoriesLayoutView;
