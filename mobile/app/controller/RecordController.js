Ext.define('mona.controller.RecordController', {
	extend: 'Ext.app.Controller',
	requires: [
		'mona.store.RecordStore'
	],
	config: {
		refs: {
			recordslist: 'recordslist'
		},
		control: {
			recordslist: {
				launch: function() {
					var store = Ext.data.StoreManager.get('RecordStore');
					store.load();
				}
			}
		}
	},
	launch: function() {
		var store = Ext.data.StoreManager.get('RecordStore');

		if(store) {
			store.load();
		}
	},
	initialize: function() {
		console.log('RecordList initialize');
	}
});
