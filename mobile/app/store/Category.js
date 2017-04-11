Ext.define('MTAPP.store.Category', {
  extend: 'Ext.data.Store',
  xtype: 'store-category',
  config: {
		autoLoad: false,
    model: 'MTAPP.model.Category',
    storeId: 'Category'
  }
});
