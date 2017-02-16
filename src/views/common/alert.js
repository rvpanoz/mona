const Marionette = require('backbone.marionette')

var AlertView = Marionette.View.extend({
  alertType: 'info',
  className: 'alert-container app-messages animated',
  initialize: function(params) {
    this.opts = _.extend(params);
    this.alertType = this.opts.alertType;
    this.message = this.opts.message;
    this.template = require('templates/common/' + this.alertType + '.hbs');
  },
  onBeforeRender() {
  	$("body").append(this.$el);
  },
  onRender() {
    this.$el.removeClass('hide').addClass('fadeIn');
    _.delay(_.bind(function() {
      if(this.isRendered())
        this.$el.addClass('hide').addClass('fadeOut');
    }, this), 5000)
  },
  serializeData() {
    return {
      message: this.message
    }
  }
});

module.exports = AlertView;
