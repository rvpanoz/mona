Ext.define('MTAPP.view.CategoryViewDetails', {
	extend: 'Ext.form.Panel',
	xtype: 'categorydetails',
	config: {
		autoDestroy: true,
		items: [{
			xtype: 'container',
			cls: 'edit',
			items: [{
				xtype: 'textfield',
				name: 'name',
				label: 'Name',
				required: true
			}]
		}]
	}
});

Ext.define('savecategorybutton', {
	extend: 'Ext.Button',
	xtype: 'savecategorybutton',
	config: {
		text: 'Save',
		align: 'right',
		ui: 'action',
		cls: 'save'
	}
});
