Ext.define('MTAPP.view.RecordsNavView', {
	extend: 'Ext.navigation.View',
	xtype: 'recordsview',
	requires: [
		'Ext.plugin.PullRefresh',
		'Ext.field.DatePicker',
		'MTAPP.view.RecordViewDetails'
	],
	config: {
		autoDestroy: true,
		layout: {
			animation: true
		},
		navigationBar: {
	    splitNavigation: false,
	    ui: 'sencha',
	    items: [{
	        xtype: 'button',
	        id: 'newButton',
	        text: 'New record',
					ui: 'sencha',
	        align: 'right',
	        hidden: false,
	        hideAnimation: Ext.os.is.Android ? false : {
	          type: 'fadeOut',
	          duration: 200
	        },
	        showAnimation: Ext.os.is.Android ? false : {
	          type: 'fadeIn',
	          duration: 200
	        }
	      },
	      {
	        xtype: 'button',
	        id: 'saveButton',
	        text: 'Save record',
	        ui: 'sencha',
	        align: 'right',
	        hidden: true,
	        hideAnimation: Ext.os.is.Android ? false : {
	          type: 'fadeOut',
	          duration: 200
	        },
	        showAnimation: Ext.os.is.Android ? false : {
	          type: 'fadeIn',
	          duration: 200
	        }
	      }
	    ]
	  },
		items: [{
			xtype: 'container',
			layout: 'vbox',
			title: 'Records',
			config: {
				itemId: 'records-container'
			},
			items: [{
					xtype: 'toolbar',
					ui: 'light',
					items: [{
							xtype: 'leftFilterButton',
							hidden: true
						},
						{
							xtype: 'spacer'
						},
						{
							xtype: 'datepickerfield',
							value: new Date(),
							dateFormat: 'm/Y',
							picker: {
								cancelButton: 'Cancel',
								doneButton: 'Apply',
								slotOrder: ['month', 'year'],
								yearFrom: new Date().getFullYear(),
								yearTo: new Date().getFullYear() + 100
							}
						},
						{
							xtype: 'spacer'
						},
						{
							xtype: 'rightFilterButton',
							hidden: true
						}
					]
				},
				{
					xtype: 'recordslist',
					id: 'records-list',
					flex: 1
				}
			]
		}]
	}
});


Ext.define('MTAPP.view.RecordsList', {
	extend: 'Ext.List',
	xtype: 'recordslist',
	config: {
		store: 'Record',
		grouped: true,
		itemTpl: new Ext.XTemplate(
			'<div>',
			'<div>{amount}&nbsp;&euro; - {category_name}</div>',
			'</div>'
		),
		title: 'Records',
		emptyText: '<div style="margin-top: 20px; text-align: center">No records found.</div>',
		plugins: [{
			xclass: 'Ext.plugin.PullRefresh'
		}]
	}
});

Ext.define('MTAPP.button.new', {
	extend: 'Ext.Button',
	xtype: 'new',
	config: {
		iconCls: 'add',
		icon: true,
		align: 'right'
	}
});

Ext.define('datepickertoolbar', {
	extend: 'Ext.Toolbar',
	alias: 'widget.datepickertoolbar',
	config: {
		docked: 'top',
		cls: 'datepickertoolbar',
		items: [{
			xtype: 'button',
			align: 'center',
			handler: function (button, event) {
				var picker = button.up('datepicker');
				picker.fireEvent('change', picker, null);
				picker.hide();
			},
			ui: 'decline'
		}]
	}
});

Ext.define('leftFilterButton', {
	extend: 'Ext.Button',
	xtype: 'leftFilterButton',
	config: {
		iconCls: 'arrow_left',
		icon: true
	}
});

Ext.define('rightFilterButton', {
	extend: 'Ext.Button',
	xtype: 'rightFilterButton',
	config: {
		icon: true,
		iconCls: 'arrow_right'
	}
});
