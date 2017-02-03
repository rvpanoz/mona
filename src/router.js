const $ = require('jquery')
const _ = require('underscore');
const Backbone = require('backbone')
const utils = require('./utils')

module.exports = Backbone.Router.extend({
  routes: {
    '*actions': 'do_action'
  },
  do_action: function (actions) {
    try {

      var token = localStorage.getItem('token');
      var url = utils.decode(actions), opts;

      //fix url
      if (!url || _.isNull(url)) {
        url = {
          cls: 'home'
        }
      }

      //check token
      if ((!token || _.isNull(token)) && ($.inArray(url.cls, app.publicUrls) == -1)) {
        return app.navigate('login');
      } else {
        if (($.inArray(url.cls, app.publicUrls) !== -1)) {
          app.onAppEvent('userstate:change');
        }
      }

      //load the view
      app.onAppEvent('app:loadView', url);
    } catch (e) {
      throw new Error(e);
    }
  }
});
