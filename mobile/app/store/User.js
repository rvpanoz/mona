Ext.define('MTAPP.store.User', {
  extend: 'Ext.data.Store',
  requires: ['Ext.data.identifier.Uuid'],
  config: {
    autoLoad: true,
    storeId: 'User',
    identifier: {
      type: 'uuid'
    },
    fields: ['id_token', 'is_admin'],
    proxy: {
      type: 'localstorage',
      id: 'userinformation'
    }
  }
});
