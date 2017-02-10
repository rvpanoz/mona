const config = require('./config')
const $ = require('jquery')
const Bootstrap = require('bootstrap/dist/js/bootstrap.min')
const Backbone = require('backbone')
const Marionette = require('backbone.marionette')
const LayoutView = require('./views/layout')
const Router = require('./router')

var app = Marionette.Application.extend({
  user: null,
  content: null,
  activeAlert: null,
  region: '#app-content',
  baseUrl: config.api.url,
  publicUrls: ['login', 'register'],
  onAppEvent(event, opts) {
    this.trigger(event, opts);
  },
  onBeforeStart() {
    this.router = new Router();
  },
  onStart() {
    var token = localStorage.getItem('token');

    this.config = config;
    this.showView(new LayoutView());

    if (Backbone.history) {
      Backbone.history.start();
    }

    this.listenTo(this, 'app:signin', this.onSignin, this, arguments);
    this.listenTo(this, 'app:signout', this.onSignout, this, arguments);
    this.listenTo(this, 'hide:sidebar', this.onHideSidebar, this, arguments);
  },
  navigate(cls, params) {
    var url = {};
    _.extend(url, {
      cls: cls,
      params: params
    });
    this.trigger('hide:filters');
    this.router.navigate(JSON.stringify(url), {
      trigger: true
    });
    this.trigger('hide:sidebar');
    return false;
  },
  onHideSidebar() {
    $('.dashboard').removeClass('dashboard_menu');
  },
  onSignin(token) {
    localStorage.setItem('token', token);
    this.onAppEvent('userstate:change', true);
    return false;
  },
  onSignout() {
    localStorage.removeItem('token');
    this.onAppEvent('userstate:change', false);
    this.navigate('login');
    return false;
  },
  checkState() {
    return localStorage.get('token');
  },
  stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;

    return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  },
  showMessage: function(message, html) {

    var alertView = require('./views/common/alert');
    var activeAlert = new alertView({
      className: 'alert-active',
      alertType: 'alert-info',
      message: message
    });
    activeAlert.render();

    //hide snackbar
    setTimeout(_.bind(function() {
      this.hideMessage();
    }, this), 5000);
  },

  hideMessage: function() {
    var active = $('.alert-active');
    active.remove();
  },
  wait(active) {
    var spinner = $('.loading');
    if (active == true) {
      spinner.show();
    } else if (active == false) {
      setTimeout(function() {
        spinner.hide();
      }, 1000);
    }
  }

});

window.app = module.exports = app
