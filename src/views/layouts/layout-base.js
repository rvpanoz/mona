import $ from 'jquery'
import _ from 'underscore'
import Bootstrap from 'bootstrap'
import Marionette from 'backbone.marionette'

import SidebarView from '../../views/common/sidebar'
import HeaderView from '../../views/common/header'
import template from '../../templates/layouts/layout-base.hbs'

//theme scripts
import themeJS from '../../scripts/theme';

//styles
import fontawesome from '../../assets/font-awesome/css/font-awesome.min.css';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.css';
import themeCss from '../../assets/theme/right.light.css';
import appCss from '../../assets/scss/app.scss';

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
    this.listenTo(app, 'app:loadView', _.bind(function (url) {
      var View = require("../../views/" + url.cls);
      var params = _.extend(url.params, {});
      app.activeView = new View(params);
      this.showChildView('mainRegion', app.activeView);
      app.activeView.$el.addClass('animated fadeIn');
    }, this));
    this.listenTo(app, 'show:alert', _.bind(function(opts) {
      return this.showAlert(opts);
    }, this));
    this.listenTo(app, 'userstate:change', _.bind(function (state) {
      this.checkState();
    }, this));
  },
  showAlert(opts) {
    var alertView = require('../../views/common/alert');
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
