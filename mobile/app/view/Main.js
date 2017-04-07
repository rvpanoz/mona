Ext.define('mona.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'mainview',
  id: 'tabpanel',
  requires: [
    'Ext.TitleBar',
    'mona.view.RecordsListView'
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
      title: 'Home',
      iconCls: 'home'
    },{
      title: 'Records',
      iconCls: 'list'
    }]
  }
});
