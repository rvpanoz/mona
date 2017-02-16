const Marionette = require('backbone.marionette');
const template = require('templates/home.hbs');
const moment = require('moment');
const Charts = require('libc/charts.js');
const config = require('../config');

var HomeView = Marionette.View.extend({
  template: template,
  data: null,
  className: 'container home',
  ui: {
    chart: '#chart'
  },
  initialize() {
    $.ajax({
      url: config.api.url + '/data/chart',
      method: 'GET',
      success: _.bind(function(data) {
        this.data = data;
        this.render();
      }, this)
    });
  },
  onDomRefresh() {
    if (this.data) {
      //generate chart
    }
  },
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
