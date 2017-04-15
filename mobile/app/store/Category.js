Ext.define('MTAPP.store.Category', {
  extend: 'Ext.data.Store',
  xtype: 'store-category',
  requires: ['Ext.data.identifier.Uuid'],
  config: {
		autoLoad: false,
    model: 'MTAPP.model.Category',
    storeId: 'Category',
    listeners: {
      beforeload: function() {
        //pass extra param to proxy
        this.getProxy().setExtraParams({
          mobile: true
        });
      },
      load: function() {}
    }
  }
});
