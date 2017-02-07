import Marionette from 'backbone.marionette';
import template from './pagination-item.hbs';

var PaginationItemView = Marionette.View.extend({
  template: template,
  className: 'paginate_button pagination-number',
  tagName: 'li',
  events: {
    'click': 'onClick'
  },
  onClick: function(e) {
    e.preventDefault();
    var page = parseInt(this.$el.text());
    this.triggerMethod('paginate', page);
  }
});

module.exports = PaginationItemView;
