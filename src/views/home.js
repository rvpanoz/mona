const Marionette = require('backbone.marionette');
const template = require('templates/home.hbs');
const moment = require('moment');
const config = require('../config');

var HomeView = Marionette.View.extend({
  template: template,
  className: 'container home',
  onBeforeRender() {
    app.triggerMethod("sidebar:switch", ".for-menu");
  },
  serializeData() {
    return {
      title: 'Home'
    }
  }
});

module.exports = HomeView;
