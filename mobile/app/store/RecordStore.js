Ext.define('mona.store.RecordStore', {
  extend: 'Ext.data.Store',
  xtype: 'RecordStore',
  config: {
    autoLoad: true,
    fields: ['amount', 'entry_date'],
    storeId: 'RecordStore',
    proxy: {
      url: api.url_dev + '/data/records',
      reader: {
        rootProperty: 'data',
        totalProperty: 'allData'
      }
    }
  }
});
