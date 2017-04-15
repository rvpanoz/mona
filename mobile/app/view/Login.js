Ext.define('MTAPP.view.Login', {
  extend: 'Ext.Panel',
  alias:'widget.Login',
  requires: [
    'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.form.Email', 'Ext.field.Password', 'Ext.data.proxy.LocalStorage'
  ],
  config: {
    autoDestroy: true,
    items: [{
        styleHtmlContent: true,
        items: {
          docked: 'top',
          xtype: 'titlebar',
          title: 'User login',
          cls: 'front speechmark'
        }
      },
      {
        xtype: 'fieldset',
        items: [{
            id: 'loginusername',
            xtype: 'textfield',
            name: 'text',
            label: 'Username',
            autoComplete: false,
            autoCorrect: false,
            listeners: {
              keyup: function(a, b) {
                if (b.browserEvent.keyCode == 13) {
                  b.stopEvent();
                  a.fieldEl.dom.blur()
                }
              }
            }
          },
          {
            id: 'loginpassword',
            xtype: 'passwordfield',
            name: 'password',
            label: 'Password',
            listeners: {
              keyup: function(a, b) {
                if (b.browserEvent.keyCode == 13) {
                  b.stopEvent();
                  a.fieldEl.dom.blur()
                }
              }
            }
          },
          {
            xtype: 'spacer',
            height: 50
          },
          {
            xtype: 'button',
            text: 'Connect',
            id: 'loginbutton',
            ui: 'action'
          }
        ]
      }
    ]
  }
});
