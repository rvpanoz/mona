const Marionette = require('backbone.marionette');
const RecordSchema = require('schemas/record');
const template = require('templates/admin/main.hbs');

var AdministrationView = Marionette.View.extend({
  template: template,
  title: 'Administration',
  serializeData: function() {
    return {
      title: this.title
    }
  }
});

module.exports = AdministrationView;
