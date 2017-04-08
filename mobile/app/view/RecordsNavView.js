Ext.define('MTAPP.view.RecordsNavView', {
  extend: 'Ext.navigation.View',
  xtype: 'recordsview',
  requires: [
    'Ext.plugin.PullRefresh',
    'Ext.field.DatePicker',
    'MTAPP.store.Record',
    'MTAPP.view.RecordViewDetails',
    'MTAPP.controller.RecordController'
  ],
  config: {
    autoDestroy: true,
    layout: {
      animation: true
    },
    navigationBar: {
      ui: 'dark',
      items: [{
        xtype: 'layout-new'
      }],
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
              xtype: 'leftFilterButton'
            },
            {
              xtype: 'spacer'
            },
            {
              xtype: 'datepickerfield',
              value: new Date(),
              picker: {
                cancelButton: 'Cancel',
                doneButton: 'Apply',
                slotOrder: ['day', 'month', 'year'],
                yearFrom: new Date().getFullYear(),
                yearTo: new Date().getFullYear() + 100
              }
            },
            {
              xtype: 'spacer'
            },
            {
              xtype: 'rightFilterButton'
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


Ext.define('MTAPP.view.RecordsList', {
  extend: 'Ext.List',
  xtype: 'recordslist',
  config: {
    store: 'Record',
    itemTpl: new Ext.XTemplate(
      '<div>',
      '<div>{amount} - {entry_date}</div>',
      '</div>'
    ),
    title: 'Records',
    emptyText: '<div style="margin-top: 20px; text-align: center">No records found.</div>'
  }
});

Ext.define('layout-new', {
  extend: 'Ext.Button',
  xtype: 'layout-new',
  config: {
    iconCls: 'add',
    icon: true,
    align: 'right',
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

Ext.define('leftFilterButton', {
  extend: 'Ext.Button',
  xtype: 'leftFilterButton',
  config: {
    iconCls: 'arrow_left',
    icon: true
  }
});

Ext.define('rightFilterButton', {
  extend: 'Ext.Button',
  xtype: 'rightFilterButton',
  config: {
    icon: true,
    iconCls: 'arrow_right'
  }
});
