Ext.define('MTAPP.model.Category', {
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
      name: 'name',
      type: 'string'
    }],
    proxy: {
      type: 'ajax',
      url: api_url + '/data/categories',
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
