Ext.define('mona.store.RecordStore', {
	extend: 'Ext.data.Store',
	xtype: 'RecordStore',
	config: {
		model: 'mona.model.Record',
		autoLoad: false,
		fields: ['amount', 'entry_date'],
		storeId: 'RecordStore',
		listeners: {
			beforeLoad: function () {
				this.getProxy().setExtraParams({
					"_params": true
				});
			},
			load: function (self, records) {
				console.log(records);
			}
		}
	}
});
