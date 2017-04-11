Ext.define('MTAPP.controller.CategoryController', {
	extend: 'Ext.app.Controller',
	requires: [
		'MTAPP.store.Category'
	],
	config: {
		refs: {
			mainview: 'mainview',
			categorydetails: 'categorydetails',
			newcategorybutton: '[itemId=newcategorybutton]',
			savecategorybutton: '[itemId=savecategorybutton]',
			categoriesnav: 'categoriesview',
			categorieslist: 'categorieslist'
		},
		control: {
			savecategorybutton: {
				tap: 'saveDetail'
			},
			newcategorybutton: {
				tap: function (view, idx, target, record) {
					var nav = view.up('navigationview');
					nav.push({
						xtype: 'categorydetails',
						title: 'Category'
					});

					var det = Ext.ComponentQuery.query('#' + nav.id + ' categorydetails')[0];
					det.setRecord(record);
				}
			},
			categorydetails: {
				activate: function (view) {
					var categoriesView = view.up();
					var newButton = Ext.ComponentQuery.query('#' + categoriesView.id + ' [itemId=newcategorybutton]');
					if (newButton[0]) {
						newButton[0].hide();
					}

					var saveButton = Ext.ComponentQuery.query('#' + categoriesView.id + ' [itemId=savecategorybutton]');
					if (saveButton[0]) {
						saveButton[0].show();
					}
				}
			},
			categorieslist: {
				itemtap: 'showDetail'
			},
			categoriesnav: {
				activate: function (view) {

				},
				deactivate: function (view) {

				},
				pop: function (categoriesView, detailsView, idx) {
					var tabpanel = categoriesView.up();
					var saveButton = Ext.ComponentQuery.query('#' + categoriesView.id + ' [itemId=savecategorybutton]');
					var newButton = Ext.ComponentQuery.query('#' + categoriesView.id + ' [itemId=newcategorybutton]');

					if (saveButton[0]) {
						saveButton[0].hide();
					}
					if (newButton[0]) {
						newButton[0].show();
					}
				},
				push: function (categoriesView, detailsView, idx) {
					var tabpanel = categoriesView.up();
				},
				show: function (categoriesView) {
					var store = this.getCategorieslist().getStore();

					//pass extra param to proxy
					store.getProxy().setExtraParams({
						mobile: true
					});

					//load the store
					store.load();
				}
			}
		}
	},
	showDetail: function (btn, evt) {
		console.log(arguments);
	},
	saveDetail: function (btn, evt) {
		var nav = btn.up('navigationview');
		var det = Ext.ComponentQuery.query('#' + nav.id + ' categorydetails')[0];
		var val = det.getValues();
		var rec = det.getRecord();
		var store = Ext.data.StoreManager.get('Category');

		// create data
		if (rec.data) {
			rec.data.name = val.name;
		} else {
			rec = Ext.create('MTAPP.model.Category', {
				name: val.name,
			});
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
