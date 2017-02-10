const Marionette = require('backbone.marionette');
const Schema = require('CategorySchema');
const template = require('../../templates/categories/categories.hbs');
const CategoryItemView = require('./item');

var Categories = Marionette.CompositeView.extend({
  title: 'Your categories',
  template: template,
  childView: CategoryItemView,
  parentUrl: 'categories/main',
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
    'table': '.table-categories'
  },
  initialize: function () {
    this.collection = new Schema.Categories();
    this.collection.fetch();
  },
  onBeforeRender: function () {
    app.triggerMethod("sidebar:switch", ".for-actions");
  },
  getSelectedModels: function () {
    var selected = _.filter(this.collection.models, function (model) {
      return model.get('_selected') == true;
    });
    return selected;
  },
  onDomRefresh() {
    var table = this.getUI('table');
    table.addClass('dataTable').DataTable({
      columnDefs: [{
        "orderable": false,
        "targets": 2
        }],
      paging: false,
      bInfo: false,
      searching: false
    }).order([0, 'desc']).draw();
  },
  onSync() {
    this.triggerMethod('fetch:categories', this.collection);
    this.render();
  },
  onChildSelectedModel: function (e, model) {
    var target = e.currentTarget;
    var selected = this.getSelectedModels();
    var hide = selected.length > 1;
    var index = $(e.currentTarget)[0].rowIndex;
    this.getUI('table').find('tr').removeClass('selected');
    $(target).toggleClass('selected');
  },
  serializeData: function () {
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
