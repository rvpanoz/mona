import Marionette from 'backbone.marionette';
import PaginationItemView from './paginationItemView';
import template from './pagination.hbs';
import config from '../../config';

var PaginationView = Marionette.CompositeView.extend({
  template: template,
  className: 'dataTables_paginate paging_numbers',
  childView: PaginationItemView,
  childViewContainer: '.pagination-items',
  page: 1,
  pages: 0,
  total: 0,
  initialize: function(opts) {
    this.pages = opts.collection.pages;
    this.totals = opts.collection.total;
    this.collection = new Backbone.Collection();

    for(var p=0;p<this.pages;p++) {
      var model = new Backbone.Model({
        page: p
      });
      var page = parseInt(model.get('page'));
      model.set('page', page+=1);
      this.collection.add(model);
    }
  },
  onRender() {
    var perPage = config.perPage;
    if(this.totals < perPage) {
      this.$el.addClass('hide');
    }
  }
});

module.exports = PaginationView;
