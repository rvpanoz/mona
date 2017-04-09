Ext.define('MTAPP.layout.Menu', {
  extend: 'Ext.Menu',
  alias: 'widget.Menu',
  xtype: 'menu',
  items: [{
      text: 'Settings',
      iconCls: 'settings'
    },
    {
      text: 'New Item',
      iconCls: 'compose'
    },
    {
      text: 'Star',
      iconCls: 'star'
    }
  ]
});
