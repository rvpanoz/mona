const Marionette = require('backbone.marionette')

var AlertView = Marionette.View.extend({
  alertType: 'info',
  className: 'smart-alerts__container hide animated',
  initialize: function(params) {
    this.opts = _.extend(params);
    this.alertType = this.opts.alertType;
    this.message = this.opts.message;
    this.template = require('../../templates/common/' + this.alertType + '.hbs');
  },
  onBeforeRender() {
  	$("body").append(this.$el);
    this.$el.removeClass('hide').addClass('bounceInRight');
  },
  onRender() {
    _.delay(_.bind(function() {
      if(this.isRendered())
        this.$el.addClass('hide').addClass('bounceInRight');
    }, this), 10000)
  },
  serializeData() {
    return {
      message: this.message
    }
  }
});

module.exports = AlertView
