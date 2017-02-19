const _ = require('lodash');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const Handlebars = require('handlebars');
const Application = require('./app');
const config = require('./config');

Backbone.emulateHTTP = false;

// load templates using Handlebars engine
Marionette.TemplateCache.prototype.lazyLoadTemplate = function (rawTemplate, options) {
  return Handlebars.compile(rawTemplate);
};

// instatiate global app
window.app = new Application();

// ajax setup
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
      }
    },
    401: function(data) {
      if (data && data.responseText) {
        var response = JSON.parse(data.responseText);
        app.triggerMethod('app:signout');
      }
    }
  }
});

/**
 * ajax events
 */
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
