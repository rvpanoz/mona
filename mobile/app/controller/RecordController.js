Ext.define('MTAPP.controller.RecordController', {
  extend: 'Ext.app.Controller',
  requires: [
    'MTAPP.store.Record'
  ],
  config: {
    refs: {
      mainview: 'mainview',
      dets: 'recorddetails',
      layoutNew: 'new',
      saverecordbutton: 'saverecordbutton',
      recordsnav: 'recordsview',
      recordslist: 'recordslist',
      leftFilterButton: 'leftFilterButton',
      rightFilterButton: 'rightFilterButton',
      datepickerfield: 'datepickerfield'
    },
    control: {
      saverecordbutton: {
        tap: 'save'
      },
      recordsnav: {
        pop: function(recordsView, detailsView, idx) {
          var tabpanel = recordsView.up();
          Ext.ComponentQuery.query('#' + recordsView.id + ' new')[0].show();
        },
        push: function(recordsView, detailsView, idx) {
          var tabpanel = recordsView.up();
          Ext.ComponentQuery.query('#' + recordsView.id + ' new')[0].hide();
        },
        show: function(view) {
          var store = this.getRecordslist().getStore();
          // var dp = Ext.ComponentQuery.query('#' + view.id + ' datepickerfield')[0];

          var dp = this.getDatepickerfield();

          dp.addListener('change', function(cmp) {
            var startDate = new Date(cmp.getValue());
            var endDate = Ext.Date.add(startDate, Ext.Date.MONTH, 1);
            if (!startDate || !endDate) return;

            store.getProxy().setExtraParams({
              mobile: true,
              'input-entry-date-from': startDate,
              'input-entry-date-to': endDate
            });

            store.load();
          });

          store.getProxy().setExtraParams({
            mobile: true
          });

          store.load();
        }
      },
      dets: {
        activate: function(view) {
          var selectfield = Ext.ComponentQuery.query('#' + view.id + ' selectfield')[0];
          var categories = Ext.data.StoreManager.get('Category');

          categories.load({
            callback: function() {
              selectfield.setStore(categories);
            }
          });
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
          //get recordslist navigationview
          var nav = view.up('navigationview');

          nav.push({
            xtype: 'recorddetails',
            title: 'Record'
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
  },
  save: function(btn, evt) {
    var nav = btn.up('navigationview');
    var det = Ext.ComponentQuery.query('#' + nav.id + ' recorddetails')[0];
    var val = det.getValues();
    var rec = det.getRecord();

    var store = Ext.data.StoreManager.get('Record');
    det.fireEvent('submit');

    // create data
    if (rec.data) {
      rec.data.amount = val.amount;
      rec.data.kind = (val.kind === true) ? 2 : 1;
      rec.data.entry_date = val.entry_date;
      rec.data.notes = val.notes;
      rec.data.payment_method = (val.payment_method === true) ? 2 : 1;
      rec.data.category_id = val.category_id;
    } else {
      rec = Ext.create('MTAPP.model.Record', {
        amount: val.amount,
        category_id: val.category_id,
        kind: (val.kind === true) ? 2 : 1,
        payment_method: (val.payment_method === true) ? 2 : 1,
        entry_date: val.entry_date,
        notes: val.notes
      });
    }

    // save record and return to list
    rec.save(function() {
      nav.setMasked({
        xtype: 'loadmask'
      });
      store.load({
        callback: function() {
          nav.setMasked(false);
          nav.pop();
        }
      })
    });
  }
});
