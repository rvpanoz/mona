Ext.define('MTAPP.store.Record', {
  extend: 'Ext.data.Store',
  xtype: 'store-record',
  config: {
    grouper: {
      sortProperty: 'entry_date',
      groupFn: function(record) {
        return record.get('entry_date');
      }
    },
    autoLoad: false,
    model: 'MTAPP.model.Record',
    storeId: 'Record'
  }
});
