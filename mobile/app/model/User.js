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
      reader: {
        type: 'json',
        rootProperty: 'data',
        encode: true
      },
      actionMethods: {
        read: "GET"
      }
    }
  }
});
