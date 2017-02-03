const $ = require('jquery')
const _ = require('underscore')
const Marionette = require('backbone.marionette')
const template = require('../../templates/common/header.hbs')

var HeaderView = Marionette.View.extend({
  template: template,
  className: 'row',
  events: {
    'click a#sidebar__toggle': 'onSidebarToggle',
    'click a.signout': 'onSignout'
  },
  onSidebarToggle(e) {
    e.preventDefault();
    $('.wrapper').toggleClass('alt');
    return false;
  },
  onSignout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    app.navigate('login');
    return false;
  }
});

module.exports = HeaderView
