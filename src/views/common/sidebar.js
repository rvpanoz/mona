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
    'click a.navigation-link': 'onNavigate'
  },
  ui: {
    'userNav': '.sidebar-user__nav'
  },
  onToggleUserInfo() {
		return false;
  },
  onSidebarToggle(e) {
    e.preventDefault();
    $('.wrapper').toggleClass('alt');
    return false;
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
  },
});

module.exports = HeaderView
