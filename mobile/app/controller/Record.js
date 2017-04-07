Ext.define('mona.controller.Record', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			recordslist: 'recordslist'
		},
		control: {
			recordslist: {
				initialize() {
					var store = Ext.data.StoreManager.get('RecordStore');
					store.load({
						callback: function () {
							store.sync();
						}
					});
				}
			}
		}
	}
})
