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

    debugger;
    
    if (errors.length) {
      var message = errors[0].message;
      $.bootstrapGrowl("another message, yay!", {
        ele: 'body', // which element to append to
        type: 'info', // (null, 'info', 'danger', 'success')
        offset: {
          from: 'top',
          amount: 20
        }, // 'top', or 'bottom'
        align: 'right', // ('left', 'right', or 'center')
        width: 250, // (integer, or 'auto')
        delay: 4000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
        allow_dismiss: true, // If true then will display a cross to close the popup.
        stackup_spacing: 10 // spacing between consecutively stacked growls.
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
