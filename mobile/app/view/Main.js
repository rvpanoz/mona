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
				type: 'fade'
			}
		},
		activeItem: 0,
		tabBarPosition: 'bottom',
		items: [{
			title: 'Home',
			iconCls: 'home'
		}, {
			title: 'Records',
			iconCls: 'list',
			xtype: 'nav-records-view'
		}]
	}
});
