Ext.define('mona.controller.Main', {
  extend: 'Ext.app.Controller',
  xtype: 'maincontroller',
  config: {
    refs: null,
    controls: null
  },
  init: function() {
    console.log('main init');
  },
  launch: function() {
    console.log('main launch');
  }
});
