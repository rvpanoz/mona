Ext.define('MTAPP.controller.RecordController', {
  extend: 'Ext.app.Controller',
  requires: [
    'MTAPP.store.Record'
  ],
  config: {
    refs: {
      layoutNew: 'layout-new',
      recordsview: 'recordsview',
      recordslist: 'recordslist',
      leftFilterButton: 'leftFilterButton',
      rightFilterButton: 'rightFilterButton',
      dp: 'datepickerfield'
    },
    control: {
      recordsview: {
        activate: function() {
          var dp = this.getDp();
          var store = this.getRecordslist().getStore();
          store.load();
        }
      },
      leftFilterButton: {
        tap: function() {
          console.log(arguments);
        }
      },
      rightFilterButton: {
        tap: function(btn, evt) {
          console.log(arguments);
        }
      },
      layoutNew: {
        tap: function(view, idx, target, record) {
          var nav = view.up('navigationview');
          nav.push({
            xtype: 'recorddetails',
            title: 'Record'
          });

          var bar = nav.getNavigationBar();

          bar.add({
            xtype: 'saverecordbutton'
          });

          var det = Ext.ComponentQuery.query('#' + nav.id + ' recorddetails')[0];
          det.setRecord(record);

          if (record.data) {
            det.add([{
              xtype: 'deleterecordbutton'
            }]);
          }
        }
      }
    }
  }
});
