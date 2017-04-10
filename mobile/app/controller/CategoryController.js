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
				tap: function (view, idx, target, record) {

				}
			},
			categorydetails: {
				activate: function (view) {

				}
			},
			cateogorieslist: {
				itemtap: 'showCategory'
			},
			cateogoriesnav: {
				activate: function (view) {

				},
				deactivate: function (view) {

				},
				pop: function (categoriesView, detailsView, idx) {
					var tabpanel = categoriesView.up();
				},
				push: function (categoriesView, detailsView, idx) {
					var tabpanel = categoriesView.up();
				}
			}
		},
		showCategory: function (btn, evt) {
			console.log(arguments);
		}
	}
});
