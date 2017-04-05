Ext.define('mona.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'mainview',
  id: 'tabpanel',
  requires: [
    'Ext.TitleBar'
  ],
  config: {
    fullscreen: true,
    layout: {
      type: 'card',
      animation: {
        type: 'slide',
        direction: 'left'
      }
    },
    activeItem: 0,
    tabBarPosition: 'bottom',
    items: [{
      title: 'Αρχική',
      iconCls: 'home'
    }]
  }
});
