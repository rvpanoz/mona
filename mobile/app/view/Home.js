Ext.define('MTAPP.view.Home', {
	extend: 'Ext.navigation.View',
	xtype: 'homeView',
	require: ['MTAPP.controller.Home'],
	config: {
		autoDestroy: true,
		items: [{
			xtype: 'panel',
			title: 'Home',
			items: []
		}]
	}
});
