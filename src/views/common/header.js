const _ = require('lodash')
const Marionette = require('backbone.marionette')
const template = require('templates/common/header.hbs')

var HeaderView = Marionette.View.extend({
  template: template,
  events: {
    'click a.navigation-link': 'onNavigate',
    'click a.signout': 'signout'
  },
  onNavigate(e) {
    e.preventDefault();
    var second_nav = $(this).find('.collapse').first();
    if (second_nav.length) {
      second_nav.collapse('toggle');
      $(this).toggleClass('opened');
    }
    var cls = this.$(e.currentTarget).data('cls');
    if (cls) {
      app.navigate(cls);
    }
    return false;
  },
  signout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    app.navigate('login');
    return false;
  },
  serializeData() {
    return {
      isAdmin: app.isAdministrator()
    }
  }
});

module.exports = HeaderView
