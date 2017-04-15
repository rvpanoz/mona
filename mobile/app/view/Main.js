Ext.define('MTAPP.view.Main', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.Main',
	xtype: 'mainview',
	id: 'tabpanel',
	requires: [
		'Ext.TitleBar'
	],
	config: {
		fullscreen: true,
		autoDestroy: true,
		activeItem: 0,
		tabBarPosition: 'bottom',
		items: [{
			title: 'Home',
			iconCls: 'home',
			xtype: 'homeView'
		}, {
			title: 'Records',
			iconCls: 'list',
			xtype: 'recordsview'
		}, {
			title: 'Categories',
			iconCls: 'favorites',
			xtype: 'categoriesview'
		},{
			title: 'Settings',
			iconCls: 'settings',
			xtype: 'settingsView'
		}]
	}
});

Ext.define('Ext.ux.plugin.PullRefresh', {
  extend: 'Ext.plugin.PullRefresh',
	config: {
		lastUpdatedDateFormat: 'd/m/Y',
		autoSnapBack: true
	},
  onLatestFetched: function (store) {
		this.callParent(arguments);
  }
});
