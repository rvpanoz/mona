const Marionette = require('backbone.marionette')
const Stickit = require('backbone.stickit')
const template = require('../templates/login.hbs')

var LoginView = Marionette.View.extend({
  template: template,
  serializeData() {
    return {
      title: 'Sign in'
    }
  }
});

module.exports = LoginView;
