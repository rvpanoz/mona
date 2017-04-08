Ext.define('MTAPP.store.Record', {
  extend: 'Ext.data.Store',
  xtype: 'store-record',
  config: {
		autoLoad: false,
    model: 'MTAPP.model.Record',
    storeId: 'Record'
  }
});
