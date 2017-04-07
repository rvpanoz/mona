Ext.define('mona.controller.RecordList', {
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
				initialize: function() {
					console.log('initialize list component');
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
