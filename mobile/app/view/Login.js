Ext.define("mona.view.Login", {
  extend: 'Ext.Panel',
  requires: [
    'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.form.Email', 'Ext.field.Password', 'Ext.data.proxy.LocalStorage'
  ],
  config: {
    autoDestroy: true,
    items: [{
        styleHtmlContent: true,
        items: {
          docked: "top",
          xtype: "titlebar",
          title: "User login",
          cls: 'front speechmark'
        }
      },
      {
        xtype: "fieldset",
        cls: 'edit',
        items: [{
            id: "loginusername",
            xtype: "textfield",
            name: "text",
            label: "Username",
            autoCorrect: false,
            autoCapitalize: false,
            labelWidth: "50%",
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
            id: "loginpassword",
            xtype: "passwordfield",
            name: "password",
            label: "Password",
            labelWidth: "50%",
            listeners: {
              keyup: function(a, b) {
                if (b.browserEvent.keyCode == 13) {
                  b.stopEvent();
                  a.fieldEl.dom.blur()
                }
              }
            }
          }
        ]
      }, {
        xtype: "button",
        text: "Connect",
        id: "loginbutton",
        margin: "0 auto",
        ui: "action"
      }
    ]
  }
});
