const _ = require('lodash');
const Backbone = require('backbone');
const utils = require('./utils');

module.exports = Backbone.Router.extend({
  routes: {
    '*actions': 'do_action'
  },
  do_action: function (actions) {
    var token = localStorage.getItem('token');
    var url = utils.decode(actions), opts;

    //fix url
    if (!url || _.isNull(url)) {
      url = {
        cls: 'records/main'
      }
    }

    //check token
    if ((!token || _.isNull(token)) && ($.inArray(url.cls, app.publicUrls) == -1)) {
      return app.navigate('login');
    } else {
      if (($.inArray(url.cls, app.publicUrls) !== -1)) {
        app.onAppEvent('userstate:change', token);
      } else {
        if (($.inArray(url.cls, app.adminUrls) !== -1) && !app.isAdministrator()) {
          return app.navigate('records/main');
        }
      }
    }

    //load the view
    app.onAppEvent('app:loadView', url);
  }
});
