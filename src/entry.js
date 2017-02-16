window.$ = window.jQuery = require("jquery");

const _ = require('lodash');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const handlebars = require('handlebars');
const Application = require('./app');
const config = require('./config');

Backbone.emulateHTTP = false;
/**
 * Load templates using Handlebars engine
 * @param  {string} rawTemplate
 * @param  {object} options
 * @return {object}
 */
Marionette.TemplateCache.prototype.lazyLoadTemplate = function (rawTemplate, options) {
  return Handlebars.compile(rawTemplate);
};

window.app = new Application();

$.ajaxSetup({
  cache: false,
  beforeSend: function(xhr) {
    var token = localStorage.getItem('token');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  },
  statusCode: {
    400: function(data) {
      if (data && data.responseText) {
        var response = JSON.parse(data.responseText);
        var alertView = require('./views/common/alert');
        var activeAlert = new alertView({
          alertType: 'alert-danger',
          message: response.message
        });
        activeAlert.render();
      }
    },
    401: function(data) {
      if (data && data.responseText) {
        var response = JSON.parse(data.responseText);
        var alertView = require('./views/common/alert');
        var activeAlert = new alertView({
          alertType: 'alert-danger',
          message: response.message
        });
        activeAlert.render();
        app.triggerMethod('app:signout');
      }
    }
  }
});

$(document).ajaxError(function(e, xhr, options, type) {
  app.wait(false);
});

$(document).ajaxStart(function() {
  app.wait(true);
});

$(document).ajaxComplete(function() {
  app.wait(false);
});

//start application
app.start();
