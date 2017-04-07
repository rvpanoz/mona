Ext.define('mona.model.Record', {
	extend: 'Ext.data.Model',
	config: {
		fields: [{
				name: '_id',
				type: 'string'
			},
			{
				name: 'amount',
				type: 'float'
			},
			{
				name: 'entry_date',
				type: 'date'
			}
		],
		proxy: {
			type: 'ajax',
			url: api.url_dev + '/data/records',
			enablePagingParams: false,
			writer: {
				type: 'json',
				rootProperty: 'data',
				encode: true
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				encode: true
			},
			actionMethods: {
				create: "POST",
				read: "GET",
				update: "PUT",
				destroy: "DELETE"
			}
		}
	}
});
