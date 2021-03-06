Ext.define('MTAPP.view.CategoriesNavView', {
	extend: 'Ext.navigation.View',
	xtype: 'categoriesview',
	requires: [
		'Ext.plugin.PullRefresh',
		'Ext.Menu',
		'MTAPP.view.CategoryViewDetails'
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
					itemId: 'newcategorybutton',
					text: 'New category',
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
					itemId: 'savecategorybutton',
					text: 'Save category',
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
			title: 'Categories',
			config: {
				itemId: 'categories-container'
			},
			items: [{
				xtype: 'categorieslist',
				itemId: 'categories-list',
				flex: 1
			}]
		}]
	}
});

Ext.define('MTAPP.view.CategoriesList', {
	extend: 'Ext.List',
	xtype: 'categorieslist',
	config: {
		store: 'Category',
		itemTpl: new Ext.XTemplate(
			'<div>',
			'<div>{name}</div>',
			'</div>'
		),
		title: 'Categories',
		emptyText: '<div style="margin-top: 20px; text-align: center">No categories found.</div>',
		plugins: [{
			xclass: 'Ext.ux.plugin.PullRefresh'
		}]
	}
});

Ext.define('MTAPP.button.categoryActionNew', {
	extend: 'Ext.Button',
	xtype: 'categoryActionNew',
	config: {
		text: 'Add category',
		iconCls: 'add',
		icon: true,
		align: 'right'
	}
});
