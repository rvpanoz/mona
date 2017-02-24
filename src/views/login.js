const _ = require('lodash');
const Marionette = require('backbone.marionette');
const Schema = require('schemas/user');
const Stickit = require('backbone.stickit');
const template = require('templates/login.hbs');

var LoginView = Marionette.View.extend({
  template: template,
  bindings: {
    '#input-email': 'email',
    '#input-password': 'password'
  },
  events: {
    'click button.btn-signin': 'onSignin',
    'click a.new-account': 'onRegister'
  },
  ui: {
    'input-email': '#input-email',
    'input-password': '#input-password'
  },
  initialize(params) {
    _.bindAll(this, '_onInvalid');
    this.params = params;
    this.model = new Schema.User();
    this.listenTo(this.model, 'invalid', this._onInvalid, arguments);
  },
  _onInvalid(model, errors) {
    var self = this;
    _.each(errors, function (err) {
      var input = self.$el.find('.form-group-' + err.field);
      if (input.length) {
        input.addClass('has-error');
      }
    }, this);
    if (errors.length) {
      var message = errors[0].message;
      app.showMessage(message, 'danger');
    }
    return false;
  },
  onRegister(e) {
    e.preventDefault();
    app.navigate('register');
    return false;
  },
  onRender() {
    this.stickit();
  },
  onSignin(e) {
    e.preventDefault();
    var isValid = this.model.validate(this.model.attributes);
    if (_.isArray(isValid)) {
      this.model.trigger('invalid', this, isValid);
      return;
    }
    $.ajax({
      url: app.baseUrl + '/user/authenticate',
      method: 'POST',
      data: {
        email: this.model.get('email'),
        password: this.model.get('password')
      },
      success: function (response) {
        var token = response.data.id_token;
        var isAdmin = response.data.admin;
        app.onAppEvent('app:signin', {
          token: token,
          isAdmin: isAdmin
        });
      },
      error: _.bind(function (err) {

      }, this)
    });

    return false;
  },
  serializeData() {
    return {
      title: 'Login to your account'
    }
  }
});

module.exports = LoginView;
