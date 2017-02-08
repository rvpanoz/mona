import Marionette from 'backbone.marionette';
import RecordSchema from 'RecordSchema';
import CategorySchema from 'CategorySchema';
import RecordItemView from './item';
import template from '../../templates/records/records.hbs'

var RecordsView = Marionette.CompositeView.extend({
  template: template,
  className: 'records',
  childView: RecordItemView,
  wantsFilters: true,
  childViewContainer: '.records-items',
  childViewTriggers: {
    'clone:model': 'child:clone:model',
    'model:selected': 'child:model:selected'
  },
  collectionEvents: {
    'sync': 'onSync',
    'remove': 'onRemove'
  },
  ui: {
    'table': '.records-table'
  },
  initialize() {
    _.bindAll(this, 'onSync');
    this.title = 'Your records';
    this.collection = new RecordSchema.Records();
    this.categories = new CategorySchema.Categories();
    this.collection.fetch();
    if(this.wantsFilters) {
      app.trigger('show:filters');
    }
  },
  onBeforeRender() {
    app.triggerMethod("sidebar:switch", ".for-filters");
  },
  getSelectedModels() {
    var selected = _.filter(this.collection.models, function(model) {
      return model.get('_selected') == true;
    });
    return selected;
  },
  onDomRefresh() {
    this.getUI('table').addClass('dataTable').DataTable({
      order: [[0, 'desc'], [1, 'asc'], [2, 'asc']],
      paging: false,
      bInfo: false,
      searching: false
    });
  },
  onChildModelSelected(e, model) {
    var target = e.currentTarget;
    var selected = this.getSelectedModels();
    var hide = selected.length > 1;
    var index = $(e.currentTarget)[0].rowIndex;
    this.getUI('table').find('tr').removeClass('selected');
    $(target).toggleClass('selected');
  },
  onRemove(model, collection) {
    this.triggerMethod('model:removed', model);
  },
  onSync() {
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
