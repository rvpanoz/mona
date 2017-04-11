Ext.define('MTAPP.view.RecordViewDetails', {
	extend: 'Ext.form.Panel',
	xtype: 'recorddetails',
	requires: ['Ext.field.Number'],
	config: {
		autoDestroy: true,
		items: [{
			xtype: 'container',
			cls: 'edit',
			items: [{
					xtype: 'numberfield',
					name: 'amount',
					label: 'Amount',
					required: true
				},
				{
					xtype: 'datepickerfield',
					name: 'entry_date',
					label: 'Date',
					dateFormat: 'd/m/Y',
					value: new Date(),
					required: true
				},
				{
					xtype: 'selectfield',
					name: 'category_id',
					store: 'Category',
					label: 'Category',
					displayField: 'name',
					valueField: '_id',
					required: true
				},
				{
					xtype: 'checkboxfield',
					name: 'kind',
					label: 'Income'
				},
				{
					xtype: 'checkboxfield',
					name: 'payment_method',
					label: 'Credit card'
				},
				{
					xtype: 'textareafield',
					name: 'notes',
					label: 'Notes'
				},
				{
					xtype: 'spacer',
					height: 25
				},
				{
					xtype: 'deleterecordbutton'
				}
			]
		}]
	}
});

Ext.define('saverecordbutton', {
	extend: 'Ext.Button',
	xtype: 'saverecordbutton',
	config: {
		text: 'Save',
		align: 'right',
		ui: 'action',
		cls: 'save'
	}
});

Ext.define('deleterecordbutton', {
	extend: 'Ext.Button',
	xtype: 'deleterecordbutton',
	config: {
		hidden: true,
		ui: 'decline',
		text: 'Delete'
	}
});

Ext.define('deleteTodoActionSheet', {
	extend: 'Ext.ActionSheet',
	xtype: 'deletetodoactionsheet',
	config: {
		autoDestroy: true,
		items: [{
				xtype: 'deletetodoactionsheetbutton'
			},
			{
				xtype: 'canceltodoactionsheetbutton'
			}
		]
	}
});

Ext.define('deleteTodoActionSheetButton', {
	extend: 'Ext.Button',
	xtype: 'deletetodoactionsheetbutton',
	config: {
		text: 'Διαγραφή',
		ui: 'decline'
	}
});

Ext.define('cancelTodoActionSheetButton', {
	extend: 'Ext.Button',
	xtype: 'canceltodoactionsheetbutton',
	config: {
		text: 'Ακύρωση'
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
			align: 'left',
			handler: function (button, event) {
				var picker = button.up('datepicker');
				picker.fireEvent('change', picker, null);
				picker.hide();
			},
			ui: 'decline'
		}]
	}
});
