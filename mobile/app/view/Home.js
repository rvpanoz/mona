Ext.define('MTAPP.view.Home', {
  extend: 'Ext.navigation.View',
  xtype: 'homeView',
  config: {
    autoDestroy: true,
    listeners: {
      activate: "onActivate"
    },
    navigationBar: {
      ui: 'dark',
      items: [{
        xtype: 'logout'
      }],
      cls: 'speechmark'
    },
    items: []
  },
  onActivate: function (b, a) {
    Ext.Ajax.request({
      url: "resources/pages/home.html",
      method: "GET",
      success: function (c, d) {
        b.setHtml(c.responseText);
      }
    });
  }
});

Ext.define('MTAPP.button.logout', {
  extend: 'Ext.Button',
  xtype: 'logout',
  config: {
    text: 'Logout',
    align: 'right',
    icon: true,
    iconCls: 'refresh'
  }
});
