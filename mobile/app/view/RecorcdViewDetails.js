Ext.define('MTAPP.view.RecordViewDetails', {
  extend: 'Ext.form.Panel',
  xtype: 'recorddetails',
  config: {
    autoDestroy: true,
    items: [{
      xtype: 'container',
      cls: 'edit',
      items: [{
          xtype: 'textfield',
          name: 'amount',
          label: 'Amount',
          required: true
        },
        {
          xtype: 'datepickerfield',
          id: 'todoDatepickerFieldId',
          name: 'DueDate',
          label: 'Λήξη',
          dateFormat: 'd/m/Y',
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
          xtype: 'textareafield',
          name: 'Notes',
          label: 'Notes'
        },
        {
          xtype: 'checkboxfield',
          name: 'Income',
          label: 'Income'
        }
      ]
    }]
  }
});

Ext.define('saverecordbutton', {
  extend: 'Ext.Button',
  xtype: 'saverecordbutton',
  config: {
    text: 'Save',
    align: 'right',
    ui: 'action',
    cls: 'save'
  }
});

Ext.define('deleterecordbutton', {
  extend: 'Ext.Button',
  xtype: 'deleterecordbutton',
  config: {
    ui: 'decline',
    text: 'Delete'
  }
});

Ext.define('deleteTodoActionSheet', {
  extend: 'Ext.ActionSheet',
  xtype: 'deletetodoactionsheet',
  config: {
    autoDestroy: true,
    items: [{
        xtype: 'deletetodoactionsheetbutton'
      },
      {
        xtype: 'canceltodoactionsheetbutton'
      }
    ]
  }
});

Ext.define('deleteTodoActionSheetButton', {
  extend: 'Ext.Button',
  xtype: 'deletetodoactionsheetbutton',
  config: {
    text: 'Διαγραφή',
    ui: 'decline'
  }
});

Ext.define('cancelTodoActionSheetButton', {
  extend: 'Ext.Button',
  xtype: 'canceltodoactionsheetbutton',
  config: {
    text: 'Ακύρωση'
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
      align: 'left',
      handler: function(button, event) {
        var picker = button.up('datepicker');
        picker.fireEvent('change', picker, null);
        picker.hide();
      },
      ui: 'decline'
    }]
  }
});
