import Marionette from 'backbone.marionette'
import SidebarView from '../views/common/sidebar'
import HeaderView from '../views/common/header'
import template from '../templates/layout.hbs'

import plugins from '../scripts/plugins';
import themeJS from '../scripts/theme';
import styles from '../scripts/all-styles';

import bootstrapCss from 'bootstrap/dist/css/bootstrap.css';
import fontawesome from '../assets/font-awesome/css/font-awesome.min.css';
import themeCss from '../assets/theme/right.light.css';
import formsCss from '../assets/scss/forms.scss';
import overrideCss from '../assets/scss/overrides.scss';
import appCss from '../assets/scss/app.scss';

var LayoutBase = Marionette.View.extend({
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
      var View = require("../views/" + url.cls);
      var params = _.extend(url.params, {});
      app.activeView = new View(params);
      this.showChildView('mainRegion', app.activeView);
    }, this));

    //showAlert: show app alert with messages
    this.listenTo(app, 'show:alert', _.bind(function(opts) {
      return this.showAlert(opts);
    }, this));

    //userstate: update UI based on user start (login/logout)
    this.listenTo(app, 'userstate:change', _.bind(function (state) {
      this.checkState();
    }, this));
  },
  showAlert(opts) {
    var alertView = require('../views/common/alert');
    this.activeAlert = new alertView(opts);
    this.activeAlert.render();
  },
  onChildModalShow(opts) {
    var params = opts || {};
    var modalView = new opts.view(params);
    this.showChildView('modalContentRegion', modalView);
    if(!params.id) {
      this.onChildModalReady();
    }
  },
  onRender: function () {
    app.wait(false);
    this.checkState();
  },
  checkState: function () {
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

module.exports = LayoutBase
