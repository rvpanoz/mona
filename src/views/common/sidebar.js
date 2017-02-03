const $ = require('jquery')
const _ = require('underscore')
const Marionette = require('backbone.marionette')
const template = require('../../templates/common/sidebar.hbs')

var HeaderView = Marionette.View.extend({
  template: template,
  className: 'sidebar',
  events: {
    'click .sidebar-user__info': 'onToggleUserInfo',
    'click .sidebar__close': 'onSidebarToggle',
    'click a.navigate': 'onNavigate'
  },
  ui: {
    'userNav': '.sidebar-user__nav'
  },
  onRender() {
    // Init perfect scrollbar
  	this.$el.perfectScrollbar({
  		suppressScrollX: true
  	});
  },
  onToggleUserInfo() {
    this.getUI('userNav').slideToggle(300, _.bind(function() {
			this.$el.perfectScrollbar("update");
		}, this));
		return false;
  },
  onSidebarToggle(e) {
    e.preventDefault();
    $('.wrapper').toggleClass('alt');
    return false;
  },
  onNavigate(e) {
    e.preventDefault();
    var $target = this.$(e.currentTarget);
    var href = $target.attr('href');
    var cls = href.slice(1, href.length);
    app.navigate(cls);
    this.onSidebarToggle(e);
  }
});

module.exports = HeaderView
