Ext.define('MTAPP.controller.Home', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      homeView: 'homeView',
      logout: 'logout'
    },
    control: {
      homeView: {
        activate: function(view) {
          
        }
      },
      logout: {
        tap: function(btn, evt) {
          var store = Ext.data.StoreManager.get('User');
          store.removeAll();
          store.sync();
          Ext.Viewport.setActiveItem('Login');
        }
      }
    }
  },
  init: function() {

  },
  launch: function() {

  }
})
