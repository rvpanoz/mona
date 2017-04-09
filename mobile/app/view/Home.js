Ext.define('MTAPP.view.Home', {
  extend: 'Ext.navigation.View',
  xtype: 'homeView',
  config: {
    autoDestroy: true,
    navigationBar: {
      ui: 'dark',
      items: [{
        xtype: 'logout'
      }],
      cls: 'speechmark'
    },
    items: [{
      html: '<h3>Welcome</h3>'
    }]
  }
});

Ext.define('MTAPP.button.logout', {
  extend: 'Ext.Button',
  xtype: 'logout',
  config: {
    text: 'Logout',
    align: 'right'
  }
});
