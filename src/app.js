const jquery = require('jquery');

const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const LayoutView = require('views/layout');
const Router = require('./router');
const config = require('./config');

var app = Marionette.Application.extend({
  user: null,
  content: null,
  activeAlert: null,
  region: '#app-content',
  publicUrls: ['login', 'register'],
  baseUrl: config.api.url,
  onBeforeStart() {
    /**
     * Instatiate router
     * @type {Router}
     */
    this.router = new Router();
  },
  onStart() {

    /**
     * Get JWToken
     */
    var token = localStorage.getItem('token');

    /**
     * setup config
     */
    this.config = _.extend({}, config);

    /**
     * Show layout view
     */
    this.showView(new LayoutView());

    /**
     * Backbone history start
     */
    if (Backbone.history) {
      Backbone.history.start();
    }

    /**
     * Global app events
     */
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
  onAppEvent(event, opts) {
    this.trigger(event, opts);
  },
  onHideSidebar() {
    $('.dashboard').removeClass('dashboard_menu');
  },
  onSignin(token, isAdmin) {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
    this.onAppEvent('userstate:change', true);
    this.navigate('home');
    return false;
  },
  onSignout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.onAppEvent('userstate:change', false);
    this.navigate('login');
    return false;
  },
  isAdministrator() {
    return localStorage.getItem('isAdmin');
  },
  updateUI() {
    return localStorage.getItem('token');
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
  wait(active) {
    var spinner = $('.loading');
    if (active == true) {
      spinner.show();
    } else if (active == false) {
      setTimeout(function() {
        spinner.hide();
      }, 1000);
    }
  },
  showMessage(message, type) {
    return $.bootstrapGrowl(message, {
      ele: 'body',
      type: type,
      offset: {
        from: 'top',
        amount: 20
      },
      align: 'right',
      width: 250,
      delay: 4000,
      allow_dismiss: true,
      stackup_spacing: 10
    });
  }
});

window.app = module.exports = app
