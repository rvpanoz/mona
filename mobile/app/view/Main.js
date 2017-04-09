Ext.define('MTAPP.view.Main', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.Main',
	xtype: 'mainview',
	id: 'tabpanel',
	requires: [
		'Ext.TitleBar'
	],
	config: {
		fullscreen: false,
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
		}]
	}
});
