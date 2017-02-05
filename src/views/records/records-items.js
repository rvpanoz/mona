import Marionette from 'backbone.marionette';
import RecordSchema from '../../schemas/record';
import CategorySchema from '../../schemas/category';
import RecordItemView from './record-item';
import template from '../../templates/records/records.hbs'

var RecordsView = Marionette.CompositeView.extend({
  template: template,
  childView: RecordItemView,
  childViewContainer: '.records-items',
  childViewTriggers: {
    'clone:model': 'child:clone:model',
    'model:selected': 'child:selected:model'
  },
  collectionEvents: {
    'sync': 'onSync',
    'remove': 'onRemove'
  },
  ui: {
    'records-table': '.records-table'
  },
  initialize: function() {
    _.bindAll(this, 'onSync');
    this.title = 'Your records';
    this.collection = new RecordSchema.collection();
    this.categories = new CategorySchema.collection();
    this.collection.fetch();
  },

  onRender: function() {
    if(this.$el.length) {
      this.getUI('records-table').DataTable({
        paging: false,
        ordering: true,
        sorting: false,
        searching: false,
        info: false
      });
    }
  },

  getSelectedModels: function() {
    var selected = _.filter(this.collection.models, function(model) {
      return model.get('_selected') == true;
    });
    return selected;
  },

  onChildSelectedModel: function(model) {
    var selected = this.getSelectedModels();
    var hide = selected.length > 1;
    this.triggerMethod('toggle:details', hide);
  },

  onRemove: function(model, collection) {
    this.triggerMethod('model:removed', model);
  },

  onSync: function() {
    this.triggerMethod('fetch:records', this.collection);
    this.render();
  },

  serializeData: function() {
    return _.extend(this.collection.toJSON(), {
      title: this.title
    });
  }
});

module.exports = RecordsView;
