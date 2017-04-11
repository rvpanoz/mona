Ext.define('MTAPP.controller.Main', {
  extend: 'Ext.app.Controller',
  xtype: 'maincontroller',
  config: {
    refs: {
      mainview: 'mainview'
    },
    control: {
      mainview: {
        activate: function() {
          var mainview = this.getMainview();
          mainview.setActiveItem('homeView');
        }
      }
    }
  }
});
