Ext.define('MTAPP.model.Record', {
	extend: 'Ext.data.Model',
	config: {
		identifier: {
			type: 'uuid'
		},
		idProperty: 'id',
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
				type: 'string',
				required: true,
				convert: function (v, record) {
					return record.parseDate(v, record);
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
			// {
			//   type: 'length',
			//   field: 'name',
			//   min: 5
			// },
			// {
			//   type: 'format',
			//   field: 'age',
			//   matcher: /\d+/
			// },
			// {
			//   type: 'inclusion',
			//   field: 'gender',
			//   list: ['male', 'female']
			// },
			// {
			//   type: 'exclusion',
			//   field: 'name',
			//   list: ['admin']
			// }
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
	},
	parseDate: function (v, record) {
		return Ext.Date.format(new Date(v), 'd/m/Y');
	}
});
