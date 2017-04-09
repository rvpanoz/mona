Ext.define('MTAPP.model.Category', {
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
        name: 'name',
        type: 'string'
      }
    ],
    proxy: {
      type: 'ajax',
      url: api.url_prod + '/data/categories',
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
