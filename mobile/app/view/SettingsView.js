Ext.define('MTAPP.view.SettingsView', {
  extend: 'Ext.navigation.View',
  xtype: 'settingsView',
  config: {
    autoDestroy: true,
    items: [{
      xtype: 'panel',
      title: 'Settings',
      items: [{
        defaults: {
          xtype: 'button',
          cls: 'btn btn-red',
          margin: '15 0'
        },
        items: [{
          text: 'Sign out',
          handler: function() {
            var store = Ext.data.StoreManager.get('User');
            store.removeAll();
            store.sync();
            Ext.Viewport.setActiveItem('Login');
          }
        }]
      }]
    }]
  }
});
