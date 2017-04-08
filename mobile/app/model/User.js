Ext.define('MTAPP.model.User', {
  extend: 'Ext.data.Model',
  config: {
    identifier: {
        type: 'uuid'
    },
    fields: [{
        name: '_id',
        type: 'string'
      },
      {
        name: 'email',
        type: 'string'
      },
      {
        name: 'password',
        type: 'string'
      }
    ],
    proxy: {
      type: 'ajax',
      url: api.url_dev,
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
        read: "POST",
        update: "POST",
        destroy: "POST"
      }
    }
  }
});
