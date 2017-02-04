const config = require('./config')
const $ = require('jquery')
const Backbone = require('backbone')
const Marionette = require('backbone.marionette')
const LayoutView = require('./views/layouts/layout-base')
const Router = require('./router')

var app = Marionette.Application.extend({
  user: null,
  types: null,
  content: null,
  activeAlert: null,
  region: '#app-content',
  baseUrl: config.api.url,
  publicUrls: ['login', 'register'],
  onAppEvent(event, opts) {
    this.trigger(event, opts);
  },
  onBeforeStart() {
    this.user = JSON.parse(localStorage.getItem('user')) || null;
    _.extend(this.user, JSON.parse(localStorage.getItem('profile')));
    this.router = new Router();
  },
  onStart() {
    var token = localStorage.getItem('token');
    this.showView(new LayoutView());
    if (Backbone.history) {
      Backbone.history.start();
    }
  },
  navigate(cls, params) {
    var url = _.extend({
      cls: cls,
      params: params
    });
    this.router.navigate(JSON.stringify(url), {
      trigger: true
    });
    return false;
  },
  onSignin(user) {
    var profile = new Profile.model();

    localStorage.setItem('token', user.id_token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    return false;
  },

  onSignout() {
    this.user = null;
    localStorage.removeItem('token');
    this.onAppEvent('userstate:change', false);
    this.navigate('login');
    return false;
  },

  checkState() {
    return localStorage.get('token');
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
