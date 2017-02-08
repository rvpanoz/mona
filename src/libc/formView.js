const Marionette = require('backbone.marionette');
const Stickit = require('backbone.stickit');

var FormView = Marionette.View.extend({
  initialize(opts) {
    this.params = _.extend({}, opts[0]);
    this.listenTo(this.model, 'invalid', this.onValidationError, this);
  },
  onRender() {
    if(this.bindings) {
      this.stickit();
    }
  },
  onValidationError(model) {
    var errors = model.validationError;
    var groups = this.$('.form-group');

    groups.removeClass('has-error');
    _.each(errors, function(err) {
      var element = this.$('.form-group-' + err.field);
      if (element) {
        element.addClass('has-error');
      }
    }, this);

    return _.isEmpty(errors) ? void 0 : errors;
  }
});

module.exports = FormView;
