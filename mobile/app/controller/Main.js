Ext.define('MTAPP.controller.Main', {
  extend: 'Ext.app.Controller',
  xtype: 'maincontroller',
  config: {
    refs: {
      logout: 'layout-logout'
    },
    control: {
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
    console.log('main init');
  },
  launch: function() {
    console.log('main launch');
  }
});
