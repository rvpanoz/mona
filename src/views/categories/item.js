const Marionette = require('backbone.marionette');
const Schema = require('CategorySchema');
const moment = require('moment');
const template = require('../../templates/categories/item.hbs');

var CategoryItemView = Marionette.View.extend({
  template: template,
  className: 'category-item',
  tagName: 'tr',
  attributes: {
    role: 'row'
  },
  modelEvents: {
    'destroy': 'onModelDestroy'
  },
  events: {
    'click': 'onClick',
  },
  onClick: function(e) {
    e.preventDefault();
    var isSelected = this.$el.toggleClass('selected');
    this.model.set('_selected', this.$el.hasClass('selected'));
    this.triggerMethod('model:selected', e, this.model);
  },
  onModelDestroy: function(model) {
    this.triggerMethod('model:removed', model);
  },
  serializeData: function() {
    var dc = this.model.get('created_at');
    var du = this.model.get('updated_at');

    return _.extend(this.model.toJSON(), {
      'date_created': moment(dc).format('DD/MM/YYYY HH:mm'),
      'date_updated': moment(du).format('DD/MM/YYYY HH:mm')
    });
  }
});

module.exports = CategoryItemView;
