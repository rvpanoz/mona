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

          if(val !== null && raw.data._id) {
            var d = Ext.Date.parse(val, 'c'); //parse ISOdate format - mongodb
            return (d) ? new Date(d) : new Date(val);
          } else {
            if(!isNaN(dp) && !raw.data._id) {
              return new Date(dp);
            }
          }
        }
      },
      {
        name: 'payment_method',
        type: 'string'
      },
      {
        name: 'kind',
        type: 'integer',
        convert: function(val, raw) {
          return val.toString();
        }
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
      type: 'rest',
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
