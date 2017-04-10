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
				xtype: 'new'
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
			items: [{
					xtype: 'categoryActionNew',
					flex: 1
				},
				{
					xtype: 'categoriesList',
					flex: 2
				}
			]
		}]
	},
	launch: function () {
		debugger;
		this.setMenu();
	},
	createMenu: function (side) {
		var items = [{
				text: 'Settings',
				iconCls: 'settings',
				scope: this,
				handler: function () {
					Ext.Viewport.hideMenu(side);
				}
			},
			{
				text: 'New Item',
				iconCls: 'compose',
				scope: this,
				handler: function () {
					Ext.Viewport.hideMenu(side);
				}
			},
			{
				xtype: 'button',
				text: 'Star',
				iconCls: 'star',
				scope: this,
				handler: function () {
					Ext.Viewport.hideMenu(side);
				}
			}
		];

		var className = 'Ext.Menu';

		return Ext.create(className, {
			items: items
		});
	},
	setMenu: function (hidden) {
		Ext.Viewport.setMenu(this.createMenu('left'), {
			side: 'left',
			reveal: true
		});

		// Ext.Viewport.setMenu(this.createMenu('right'), {
		// 	side: 'right',
		// 	reveal: true
		// });
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
