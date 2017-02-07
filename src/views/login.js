const Marionette = require('backbone.marionette')
const Schema = require('../schemas/user')
const Stickit = require('backbone.stickit')
const template = require('../templates/login.hbs')

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
    this.params = params;
    this.model = new Schema.User();
    this.listenTo(this.model, 'invalid', _.bind(this._onInvalid, this));
  },
  _onInvalid(model, errors) {
    _.each(errors, function (err) {
      var input = this.$('.form-group-' + err.field);
      if (input.length) {
        input.addClass('has-error');
      }
    }, this);
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
        if (response.data.admin == true) {
          app.isAdmin = true;
        }
        var token = response.data.id_token;
        app.onAppEvent('app:signin', token);
      },
      error: _.bind(function () {

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
