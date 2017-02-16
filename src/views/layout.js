const Marionette = require('backbone.marionette');
const SidebarView = require('views/common/sidebar');
const HeaderView = require('views/common/header');
const template = require('templates/layout.hbs');

const plugins = require('scripts/plugins');
const themeJS = require('scripts/theme');
const styles = require('scripts/all-styles');

const bootstrapCss = require('bootstrap/dist/css/bootstrap.css');
const fontawesome = require('assets/font-awesome/css/font-awesome.min.css');
const themeCss = require('assets/theme/right.light.css');
const formsCss = require('assets/scss/forms.scss');
const overrideCss = require('assets/scss/overrides.scss');
const appCss = require('assets/scss/app.scss');

var Layout = Marionette.View.extend({
  template: template,
  className: 'wrapper',
  childViewTriggers: {
    'modal:ready': 'child:modal:ready',
    'modal:show': 'child:modal:show',
    'show:details': 'child:show:details'
  },
  regions: {
    sidebarRegion: '#sidebar-content',
    headerRegion: '#header-content',
    mainRegion: '#main-content',
    modalContentRegion: '.modal-content'
  },
  ui: {
    modal: '.modal'
  },
  initialize() {
    //loadView: attach view to mainRegion content
    this.listenTo(app, 'app:loadView', _.bind(function (url) {
      var View = require("Views/" + url.cls);
      var params = _.extend(url.params, {});
      app.activeView = new View(params);
      this.showChildView('mainRegion', app.activeView);
    }, this));

    //showAlert: show app alert with messages
    this.listenTo(app, 'show:alert', _.bind(function (opts) {
      return this.showAlert(opts);
    }, this));

    //userstate: update UI based on user start (login/logout)
    this.listenTo(app, 'userstate:change', _.bind(function (state) {
      this.updateUI();
    }, this));
  },
  onChildModalShow(opts) {
    var params = opts || {};
    var modalView = new opts.view(params);
    this.showChildView('modalContentRegion', modalView);
    if (!params.id) {
      this.onChildModalReady();
    }
  },
  onRender: function () {
    app.wait(false);
    this.updateUI();
  },
  updateUI: function () {
    var token = localStorage.getItem('token');
    if (token) {
      this.showChildView('sidebarRegion', new SidebarView());
      this.showChildView('headerRegion', new HeaderView());
    } else {
      this.getRegion('sidebarRegion').empty();
      this.getRegion('headerRegion').empty();
    }
  }
});

module.exports = Layout;
