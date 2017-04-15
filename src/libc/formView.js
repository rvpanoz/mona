const Marionette = require('backbone.marionette');
const Stickit = require('backbone.stickit');

var FormView = Marionette.View.extend({
  initialize(opts) {
    _.bindAll(this, 'onValidationError');
    this.params = _.extend({}, opts[0]);
    if (this.modelEvents) {
      _.extend(this.modelEvents, {
        'invalid': 'onValidationError',
      });
    }
  },
  onRender() {
    if (this.bindings) {
      this.stickit();
    }
  },
  onValidationError(model) {
    var errors = model.validationError;
    var groups = this.$('.form-group');
    var self = this;

    groups.removeClass('has-error');
    _.each(errors, function(err) {
      var element = self.$('.form-group-' + err.field);
      if (element) {
        element.addClass('has-error');
      }
    }, this);

    if (errors && errors.length) {
      var message = errors[0].error;
      $.bootstrapGrowl(message, {
        ele: 'body',
        type: 'danger',
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
    return _.isEmpty(errors) ? void 0 : errors;
  },
  onSave: function(e) {
    if (e) e.preventDefault();
    this.model.save(null, {
      success: _.bind(this.onBack, this)
    });
  },
  onBack: function() {
    if (this.parentUrl) {
      app.navigate(this.parentUrl);
    }
    return false;
  }
});

module.exports = FormView;
