Ext.define('mona.view.RecordsListView', {
  extend: 'Ext.navigation.View',
  xtype: 'recordsnav',
  requires: [
    'Ext.plugin.PullRefresh',
    'Ext.field.DatePicker',
    'mona.store.RecordStore',
  ],
  config: {
    autoDestroy: true,
    layout: {
      animation: true
    },
    navigationBar: {
      ui: 'dark',
      items: [{
        xtype: 'addtodobutton'
      }],
      id: 'appbarId2',
      cls: 'speechmark app-bar',
      backButton: {
        width: 36
      }
    },
    items: [{
      xtype: 'container',
      layout: 'vbox',
      title: 'Records',
      config: {
        itemId: 'records-container'
      },
      items: [{
          xtype: 'toolbar',
          ui: 'light',
          items: [{
              xtype: 'lefttodolistbutton'
            },
            {
              xtype: 'spacer'
            },
            {
              xtype: 'datepickerfield',
              id: 'recordlistDatepickerId',
              picker: {
                value: new Date(),
                cancelButton: 'Ακύρωση',
                doneButton: 'Επιλογή',
                slotOrder: ['day', 'month', 'year'],
                yearFrom: new Date().getFullYear(),
                yearTo: new Date().getFullYear() + 100
              }
            },
            {
              xtype: 'spacer'
            },
            {
              xtype: 'righttodolistbutton'
            }
          ]
        },
        {
          xtype: 'recordslist',
          id: 'records-list',
          flex: 1
        }
      ]
    }]
  }
});


Ext.define('mona.view.RecordsList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordslist',
  config: {
    fullscreen: true,
    disableSelection: false,
    itemHeight: '36px',
    store: 'RecordStore',
    itemTpl: '{amount - entry_date}',
    title: 'Records',
    emptyText: '<div style="margin-top: 20px; text-align: center">No records found.</div>'
  }
});

Ext.define('addTodoButton', {
  extend: 'Ext.Button',
  xtype: 'addtodobutton',
  config: {
    iconCls: 'add',
    iconMask: true,
    align: 'right',
    text: 'New',
    cls: 'add'
  }
});

Ext.define('datepickertoolbar', {
  extend: 'Ext.Toolbar',
  alias: 'widget.datepickertoolbar',
  config: {
    docked: 'top',
    cls: 'datepickertoolbar',
    items: [{
      xtype: 'button',
      align: 'center',
      handler: function(button, event) {
        var picker = button.up('datepicker');
        picker.fireEvent('change', picker, null);
        picker.hide();
      },
      ui: 'decline'
    }]
  }
});

Ext.define('lefttodolistButton', {
  extend: 'Ext.Button',
  xtype: 'lefttodolistbutton',
  config: {
    iconCls: 'arrow_left',
    iconMask: true
  }
});


Ext.define('recordlistDatepicker', {
  extend: 'Ext.field.DatePicker',
  xtype: 'recordlistDatepicker',
  config: {
    name: 'date',
    value: new Date()
  },
  picker: {
    cancelButton: 'Cancel',
    doneButton: 'Apply',
    slotOrder: ['day', 'month', 'year'],
    yearFrom: new Date().getFullYear(),
    yearTo: new Date().getFullYear() + 100
  }
});

Ext.define('righttodolistButton', {
  extend: 'Ext.Button',
  xtype: 'righttodolistbutton',
  config: {
    iconCls: 'arrow_right',
    iconMask: true
  }
});
