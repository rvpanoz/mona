const config = require('./config')
const $ = require('jquery')
const Backbone = require('backbone')
const Marionette = require('backbone.marionette')
const LayoutView = require('./views/layouts/layout-base')
const Router = require('./router')

require('./assets/scss/app.scss')

var app = Marionette.Application.extend({
  user: null,
  types: null,
  content: null,
  activeAlert: null,
  region: '#app-content',
  baseUrl: config.api.url,
  publicUrls: ['login', 'register'],

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

  // dispatch function to handle internal app events
  onAppEvent(event, opts) {
    this.trigger(event, opts);
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
    profile.fetch({
      success: _.bind(function(profile) {
        localStorage.setItem('profile', JSON.stringify(profile.toJSON()));
        _.extend(this.user, profile.toJSON());
        this.onAppEvent('userstate:change', true);
        this.navigate('home');
      }, this)
    })
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
