const Marionette = require('backbone.marionette');
const RecordsView = require('./records');
const OverView = require('./overview');
const PaginationView = require('components/pagination/pagination');
const template = require('templates/records/main.hbs');

var RecordsLayoutView = Marionette.View.extend({
  template: template,
  title: 'Records',
  regions: {
    recordsRegion: '#records-content',
    paginationRegion: '#pagination-content',
    overviewRegion: '#overview-content'
  },
  childViewTriggers: {
    'fetch:records': 'child:fetch:records',
    'model:removed': 'child:model:removed',
    'model:selected': 'child:model:selected',
    'apply:filters': 'child:apply:filters',
    'paginate': 'child:records:paginate'
  },
  events: {
    'click .new': 'onNew'
  },
  initialize() {
    this.listenTo(app, 'apply:filters', this.onChildApplyFilter, arguments, this);
  },
  onNew: function(e) {
    e.preventDefault();
    return app.navigate('records/record');
  },
  onRender: function() {
    var recordsView = new RecordsView();
    this.showChildView('recordsRegion', recordsView);
  },
  onChildRecordsPaginate: function(page) {
    var pagination = this.getChildView('paginationRegion');
    var recordsView = this.getChildView('recordsRegion');

    if(this.query) {
      this.query.page = page;
    }
    if(recordsView && recordsView.collection) {
      var collection = recordsView.collection;
      collection.fetch({
        data: (this.query) ? this.query : {
          page: page
        }
      });
    }
  },
  onChildFetchRecords: function(collection) {
    var paginationView = this.getChildView('paginationRegion');
    this.collection = collection;

    this.showChildView('overviewRegion', new OverView({
      collection: collection
    }));

    this.showChildView('paginationRegion', new PaginationView({
      collection: collection
    }));

    app.triggerMethod("sidebar:switch", "actions");
  },

  onChildApplyFilter: function(opts) {
    var recordsView = this.getChildView('recordsRegion');
    recordsView.collection.fetch({
      data: opts.data
    });
    return false;
  },
  serializeData: function() {
    return {
      title: this.title
    }
  }
});

module.exports = RecordsLayoutView
