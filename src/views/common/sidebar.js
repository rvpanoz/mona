const _ = require('lodash');
const Marionette = require('backbone.marionette');
const FiltersView = require('../records/filters');
const template = require('templates/common/sidebar.hbs');

var SidebarView = Marionette.View.extend({
  template: template,
  className: 'sidebar-content',
  regions: {
    filtersRegion: '#filters-content',
  },
  events: {
    'click .sidebar-user__info': 'onToggleUserInfo',
    'click .sidebar__close': 'onSidebarToggle',
    'click a.navigation-link': 'onNavigate'
  },
  ui: {
    'userNav': '.sidebar-user__nav'
  },
  initialize() {
    _.bindAll(this, 'onShowFilters');
    this.listenTo(app, "show:filters", this.onShowFilters, arguments, this);
    this.listenTo(app, "hide:filters", this.onHideFilters, arguments, this);
    this.listenTo(app, "sidebar:switch", this.setActiveMenuItem, arguments, this);
  },
  onShowFilters(opts) {
    var filtersView = new FiltersView(opts);
    this.showChildView('filtersRegion', filtersView);
    app.trigger('sidebar:switch', '.for-filters');
  },
  onHideFilters(opts) {
    var filtersRegion = this.getRegion('filtersRegion');
    filtersRegion.empty();
    app.trigger('sidebar:switch', '.for-actions');
  },
  onToggleUserInfo() {
		return false;
  },
  onSidebarToggle(e) {
    e.preventDefault();
    $('.wrapper').toggleClass('alt');
    return false;
  },
  setActiveMenuItem(itemClass) {
    var item = this.$(itemClass);
    var menu = this.$('.sidebar__menu');
    menu.removeClass('active').eq(item.index()).addClass('active');
    this.$('.quickmenu__item').removeClass('active');
    item.addClass('active');
    menu.eq(0).css('margin-left', '-' + item.index() * 200 + 'px');
  },
  onNavigate: function(e) {
    e.preventDefault();
    var second_nav = $(this).find('.collapse').first();
    if (second_nav.length) {
      second_nav.collapse('toggle');
      $(this).toggleClass('opened');
    }
    var cls = this.$(e.currentTarget).data('cls');
    if(cls) {
      app.navigate(cls);
    }
    return false;
  }
});

module.exports = SidebarView;
