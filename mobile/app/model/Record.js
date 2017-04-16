Ext.define('MTAPP.model.Record', {
  extend: 'Ext.data.Model',
  config: {
    identifier: {
      type: 'uuid',
      isUnique: true
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
        convert: function(val, record) {
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
        convert: function(val, raw) {
          var dp = Date.parse(val);
          if(isNaN(dp) && val !== null) {
            return val;
          }

          if(val !== null) {
            var d = Ext.Date.parse(val, 'c');
            return Ext.Date.format(new Date(d), 'd/m/Y');
          }
          
          return null;
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
