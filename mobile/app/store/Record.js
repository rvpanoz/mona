Ext.define('MTAPP.store.Record', {
  extend: 'Ext.data.Store',
  xtype: 'store-record',
  requires: ['Ext.data.identifier.Uuid'],
  config: {
    grouped: true,
    sorters: 'amount',
    groupDir: 'DESC',
    grouper: {
      sortProperty: 'entry_date',
      groupFn: function(item) {
        var d = item.get('entry_date');
        return Ext.Date.format(new Date(d), 'd/m/Y');
      }
    },
    autoLoad: false,
    model: 'MTAPP.model.Record',
    storeId: 'Record',
    listeners: {
      beforeload: function() {
        var prx = this.getProxy();
        var params = prx.getExtraParams();

        if (!params.mobile) {
          this.getProxy().setExtraParams({
            mobile: true
          });
        }

      }
    }
  }

});
