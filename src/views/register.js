const _ = require('lodash');
const Marionette = require('backbone.marionette');
const Schema = require('schemas/user');
const Stickit = require('backbone.stickit');
const template = require('templates/register.hbs');

var RegisterView = Marionette.View.extend({
  template: template,
  title: 'Sign up for a new account',
  bindings: {
    '#input-email': 'email',
    '#input-password': 'password'
  },
  events: {
    'click button#btn-register': 'onRegister',
    'click a.cancel': 'onCancel'
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
    return false;
  },
  onRender: function() {
    this.stickit();
  },
  onCancel: function(e) {
    e.preventDefault();
    return app.navigate('login');
  },
  onRegister: function(e) {
    e.preventDefault();
    this.model.save(null, {
      success: _.bind(function(model) {
        app.navigate('login', {
          registered: true
        });
      }, this),
      error: _.bind(function() {
        console.log('Ooops! Email taken or is invalid.');
      }, this)
    });

    return false;
  },
  serializeData: function() {
    return {
      title: this.title
    }
  }
});

module.exports = RegisterView;
