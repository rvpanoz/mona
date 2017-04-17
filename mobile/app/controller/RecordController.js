Ext.define('MTAPP.controller.RecordController', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			mainview: 'mainview',
			recorddetails: 'recorddetails',
			newrecordbutton: '[itemId=newrecordbutton]',
			saverecordbutton: '[itemId=saverecordbutton]',
			deleterecordbutton: '[itemId=deleterecordbutton]',
			recordsnav: 'recordsview',
			recordslist: 'recordslist',
			leftFilterButton: 'leftFilterButton',
			rightFilterButton: 'rightFilterButton',
			datepickerfield: 'datepickerfield'
		},
		control: {
			saverecordbutton: {
				tap: 'save'
			},
			recordslist: {
				itemtap: 'showRecord'
			},
			deleterecordbutton: {
				tap: 'deleteRecord'
			},
			recordsnav: {
				pop: function (recordsView, detailsView, idx) {
					var tabpanel = recordsView.up();
					var saveButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=saverecordbutton]');
					var newButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=newrecordbutton]');

					if (saveButton[0]) {
						saveButton[0].hide();
					}
					if (newButton[0]) {
						newButton[0].show();
					}
				},
				push: function (recordsView, detailsView, idx) {
					var tabpanel = recordsView.up();
				},
				show: function (view) {
					//load the store
					var store = this.getRecordslist().getStore();

					//datepicker component
					var dp = this.getDatepickerfield();

					//listen to 'change' event of datepicker - fetch data
					dp.addListener('change', function (cmp) {

						var startDate = new Date(cmp.getValue());
						var endDate = Ext.Date.add(startDate, Ext.Date.MONTH, 1);
						if (!startDate || !endDate) return;

						store.getProxy().setExtraParams({
							'mobile': true,
							'input-entry-date-from': startDate,
							'input-entry-date-to': endDate
						});

						store.load();
					});

					store.load();
				}
			},
			recorddetails: {
				show: function(view) {
					var nav = view.up('navigationview');
					var det = Ext.ComponentQuery.query('#' + nav.id + ' recorddetails')[0];

				},
				activate: function (view) {
					var recordsView = view.up();

					var newButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=newrecordbutton]');
					if (newButton[0]) {
						newButton[0].hide();
					}

					var saveButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=saverecordbutton]');
					if (saveButton[0]) {
						saveButton[0].show();
					}

					var deleteButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=deleterecordbutton]');
					if (deleteButton[0]) {
						deleteButton[0].hide();
					}
				},
				deactivate: function (view) {
					var recordsView = view.up();

					var newButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=newrecordbutton]');
					if (newButton[0]) {
						newButton[0].show();
					}

					var saveButton = Ext.ComponentQuery.query('#' + recordsView.id + ' [itemId=saverecordbutton]');
					if (saveButton[0]) {
						saveButton[0].hide();
					}
				}
			},
			newrecordbutton: {
				tap: function (view, idx, target, record) {
					var nav = view.up('navigationview');

					nav.push({
						xtype: 'recorddetails',
						title: 'Record'
					});

					var det = Ext.ComponentQuery.query('#' + nav.id + ' recorddetails')[0];
					det.setRecord(record);
				}
			}
		}
	},

	deleteRecord: function (btn, evt) {
		var nav = btn.up('navigationview');
		var list = this.getRecordslist();

		var selected = list.getSelection();
		if(!selected.length) {
			return Ext.Msg.alert('Information', 'Please select one record.', Ext.emptyFn);
		}

		selected[0].erase({
			success: function() {
				console.error('Record removed.');
			}
		});

		return false;
	},
	showRecord: function (list, idx, target, record) {
		var nav = list.up('navigationview');

		//TODO
		return;

		nav.push({
			xtype: 'recorddetails',
			title: 'Record'
		});

		//find details view
		var det = Ext.ComponentQuery.query('#' + nav.id + ' recorddetails')[0];

		//bind record data to details view
		det.setRecord(record);

		//if edit show/create delete button
		if (record.data) {
			var deleteButton = Ext.ComponentQuery.query('#' + det.id + ' deleterecordbutton');
			if (deleteButton) {
				deleteButton[0].show();
			}
			det.add([{
				xtype: 'deleterecordbutton'
			}]);
		}
	},
	save: function (btn, evt) {
		var nav = btn.up('navigationview');
		var det = Ext.ComponentQuery.query('#' + nav.id + ' recorddetails')[0];
		var val = det.getValues();
		var rec = det.getRecord();

		var store = Ext.data.StoreManager.get('Record');
		det.fireEvent('submit');

		// create data
		if (rec.data) {
			rec.data.amount = val.amount;
			rec.data.kind = (val.kind === true) ? 2 : 1;
			rec.data.entry_date = val.entry_date;
			rec.data.notes = val.notes;
			rec.data.payment_method = (val.payment_method === true) ? 2 : 1;
			rec.data.category_id = val.category_id;
			rec.phantom = false;
		} else {
			rec = Ext.create('MTAPP.model.Record', {
				amount: val.amount,
				category_id: val.category_id,
				kind: (val.kind === true) ? 2 : 1,
				payment_method: (val.payment_method === true) ? 2 : 1,
				entry_date: val.entry_date,
				notes: val.notes
			});
			rec.phantom = true; //mark as new
		}

		//clear sencha id if rec.phantom
		if(rec.phantom && rec.phantom == true) {
			rec.set('_id', null);
		}

		// save record and return to list
		rec.save(function () {
			nav.setMasked({
				xtype: 'loadmask'
			});
			store.load({
				callback: function () {
					nav.setMasked(false);
					nav.pop();
				}
			});
		});
	}
});
