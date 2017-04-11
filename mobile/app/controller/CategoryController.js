Ext.define('MTAPP.controller.CategoryController', {
	extend: 'Ext.app.Controller',
	requires: [
		'MTAPP.store.Category'
	],
	config: {
		refs: {
			mainview: 'mainview',
			categoryActionNew: 'categoryActionNew',
			categorydetails: 'categorydetails',
			savecategorybutton: 'savecategorybutton',
			cateogoriesnav: 'categoriesview',
			categorieslist: 'categorieslist'
		},
		control: {
			categoryActionNew: {
				tap: 'showDetail'
			},
			categorydetails: {
				activate: function (view) {

				}
			},
			categorieslist: {
				itemtap: 'showDetail'
			},
			cateogoriesnav: {
				activate: function (view) {

				},
				deactivate: function (view) {

				},
				pop: function (categoriesView, detailsView, idx) {
					var tabpanel = categoriesView.up();
					Ext.ComponentQuery.query('#' + tabpanel.id + ' new')[0].hide();
				},
				push: function (categoriesView, detailsView, idx) {
					var tabpanel = categoriesView.up();
					Ext.ComponentQuery.query('#' + tabpanel.id + ' new')[0].show();
				}
			}
		}
	},
	showDetail: function (btn, evt) {
		console.log(arguments);
	}
});
