Ext.define('MTAPP.store.Record', {
  extend: 'Ext.data.Store',
  xtype: 'store-record',
  requires: ['Ext.data.identifier.Uuid'],
  config: {
    grouped: true,
    grouper: {
      sortProperty: 'entry_date',
      groupFn: function(record) {
        return record.get('entry_date');
      }
    },
    autoLoad: false,
    model: 'MTAPP.model.Record',
    storeId: 'Record',
    listeners: {
      beforeload: function() {
        // this.getProxy().setExtraParams({
        //   mobile: true
        // });
      },
      load: function() {

      }
    }
  }

});
