const Marionette = require('backbone.marionette');
const Schema = require('../../schemas/category')
const template = require('../../templates/categories/categories-layout.hbs')
const CategoriesView = require('./categories-items');
const DetailsView = require('./details');

var CategoriesLayoutView = Marionette.View.extend({
  template: template,
  title: 'Categories',
  regions: {
    categoriesRegion: '#categories-content',
    detailsRegion: '#details-content'
  },
  childViewTriggers: {
    'model:selected': 'child:model:selected'
  },
  onRender: function() {
    var categoriesView = new CategoriesView();
    this.showChildView('categoriesRegion', categoriesView);
  },
  onChildModelSelected: function(model) {
    var categoriesView = this.getChildView('categoriesRegion');
    _.each(categoriesView.collection.models, function(cmodel) {
      if (cmodel !== model) {
        cmodel.set('_selected', false);
      }
    });
    this.showChildView('detailsRegion', new DetailsView({
      model: model
    }));
  },
  serializeData: function() {
    return {
      title: this.title
    }
  }
});

module.exports = CategoriesLayoutView;
