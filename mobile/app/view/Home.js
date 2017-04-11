Ext.define('MTAPP.view.Home', {
  extend: 'Ext.navigation.View',
  xtype: 'homeView',
  config: {
    autoDestroy: true,
    items: [{
      xtype: 'panel',
      title: 'Home',
      items: []
    }]
  }
});
