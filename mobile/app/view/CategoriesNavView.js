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
			ui: 'dark',
			items: [{
				xtype: 'categoryActionNew'
			}],
			cls: 'speechmark app-bar',
			backButton: {
				width: 36
			}
		},
		items: [{
			xtype: 'container',
			layout: 'vbox',
			title: 'Categories',
			config: {
				itemId: 'categories-container'
			},
			items: [
				{
					xtype: 'categoriesList',
					flex: 1
				}
			]
		}]
	}
});

Ext.define('MTAPP.view.CategoriesList', {
	extend: 'Ext.List',
	xtype: 'categoriesList',
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
			xclass: 'Ext.plugin.PullRefresh'
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
