const Marionette = require('backbone.marionette');
const RecordSchema = require('schemas/record');
const CategorySchema = require('schemas/category');
const template = require('templates/records/item.hbs');
const moment = require('moment');
const config = require('../../config');

var RecordItemView = Marionette.View.extend({
  template: template,
  className: 'record-item',
  tagName: 'tr',
  modelEvents: {
    'destroy': 'onModelDestroy'
  },
  events: {
    'click': 'onClick',
    'click .update': 'onUpdate',
    'click .remove': 'onRemove',
    'click .clone': 'onClone'
  },
  ui: {
    'buttonUpdate': '.update',
    'buttonRemove': '.remove',
    'buttonClone': '.clone'
  },
  initialize: function() {
    this.listenTo(this.model, 'change:_selected', _.bind(function(model, selected) {
      if(selected == true) {
        this.$el.addClass('selected');
      } else if(selected == false) {
        this.$el.removeClass('selected');
      }
    }, this));
  },
  onClick: function(e) {
    e.preventDefault();
    this.$el.toggleClass('selected');
    this.model.set('_selected', this.$el.hasClass('selected'));
    this.triggerMethod('model:selected', e, this.model);
  },
  onUpdate: function(e) {
    e.preventDefault();
    return app.navigate('records/record', {
      id: this.model.get('_id')
    });
  },
  onModelDestroy: function(model) {
    this.triggerMethod('model:removed', model);
  },
  serializeData: function() {
    var d = this.model.get('entry_date');
    var k = this.model.get('kind');
    var p = this.model.get('payment_method');

    return _.extend(this.model.toJSON(), {
      'entry_date_formatted': moment(new Date(d)).format('DD/MM/YYYY'),
      'kind_color': (k == 1) ? 'red' : 'green'
    });
  }

});

module.exports = RecordItemView;
