Ext.define('MTAPP.view.Home', {
  extend: 'Ext.navigation.View',
  xtype: 'homeView',
  config: {
    autoDestroy: true,
    navigationBar: {
      ui: 'dark',
      items: [{
        xtype: 'layout-logout'
      }],
      cls: 'speechmark'
    }
  }
});

Ext.define('layout-logout', {
  extend: 'Ext.Button',
  xtype: 'layout-logout',
  config: {
    text: 'Logout',
    align: 'right'
  }
});
