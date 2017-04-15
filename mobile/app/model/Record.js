Ext.define('MTAPP.model.Record', {
	extend: 'Ext.data.Model',
	config: {
		identifier: {
			type: 'uuid'
		},
		idProperty: '_id',
		fields: [{
				name: '_id',
				type: 'string'
			}, {
				name: 'amount',
				type: 'float',
				required: true
			},
			{
				name: 'category_id',
				type: 'string',
				required: true,
				convert: function (val, record) {
					if (val && val.name) {
						record.set('category_name', val.name);
					}
					return val;
				}
			},
			{
				name: 'category_name',
				type: 'string'
			},
			{
				name: 'entry_date',
				type: 'date',
				required: true,
				dateFormat: 'd/m/Y',
				_convert: function(val, raw) {
					//TODO - buggy for now;
					if(!val) return;
					var d = Date.parse(val);
					return Ext.Date.format(new Date(d), 'd/m/Y')
				}
			},
			{
				name: 'payment_method',
				type: 'string'
			},
			{
				name: 'kind',
				type: 'string'
			}
		],
		validations: [{
				type: 'presence',
				field: 'amount'
			},
			{
				type: 'presence',
				field: 'category_id'
			}
		],
		proxy: {
			type: 'ajax',
			url: api_url + '/data/records',
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
