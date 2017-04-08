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
        type: 'string'
      },
      {
        name: 'entry_date',
        type: 'date',
        convert: function(val) {
          return Ext.Date.parse(val, 'c');
        }
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
