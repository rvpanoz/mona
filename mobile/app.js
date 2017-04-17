/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
  name: 'MTAPP',
  requires: [
    'Ext.MessageBox',
    'Ext.util.DelayedTask',
    'Ext.plugin.PullRefresh',
    'MTAPP.utils.globals'
  ],
  models: ['User', 'Record', 'Category'],
  controllers: ['Main', 'User', 'Home', 'RecordController', 'CategoryController'],
  views: ['Main', 'Login', 'Home', 'SettingsView', 'RecordsNavView', 'CategoriesNavView'],
  stores: ['User', 'Record', 'Category'],
  icon: {
    '57': 'resources/icons/Icon.png',
    '72': 'resources/icons/Icon~ipad.png',
    '114': 'resources/icons/Icon@2x.png',
    '144': 'resources/icons/Icon~ipad@2x.png'
  },
  isIconPrecomposed: true,

  startupImage: {
    '320x460': 'resources/startup/320x460.jpg',
    '640x920': 'resources/startup/640x920.png',
    '768x1004': 'resources/startup/768x1004.png',
    '748x1024': 'resources/startup/748x1024.png',
    '1536x2008': 'resources/startup/1536x2008.png',
    '1496x2048': 'resources/startup/1496x2048.png'
  },

  onRequestComplete() {
    // console.log('request completed', arguments);
  },
  onRequestException(ajx, resp, opts) {
    /**
     * [401 (Unauthorized)]
     * @type {[type]}
     */
    if(resp.status == 401) {
      //clear user data
      var store = Ext.data.StoreManager.get('User');
      store.removeAll();
      store.sync();
      Ext.Viewport.setActiveItem('Login');
    }
  },
  launch: function() {
    var token;

    //user store (id_token, is_admin)
    var userStore = Ext.data.StoreManager.get('User');

    //load the store
    userStore.load();

    //listen to 'beforerequest' event to set Authorization header
    Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
      if (userStore.getAt(0)) {
        token = userStore.getAt(0).data.id_token;
        if (options.headers) {
          options.headers['Authorization'] = 'Bearer ' + token;
        }
      }
    });

    Ext.Ajax.on('requestcomplete', this.onRequestComplete, this);
    Ext.Ajax.on('requestexception', this.onRequestException, this);

    //get user data
    var userItem = userStore.getAt(0);
    if (userItem && userItem.data.id_token) {
			//navigate to main view
      Ext.Viewport.add(Ext.create('MTAPP.view.Main'));
    } else {
      //navigate to login view
      Ext.Viewport.add(Ext.create('MTAPP.view.Login'));
    }

    // Destroy the #appLoadingIndicator element
    Ext.fly('appLoadingIndicator').destroy();
  },

  onUpdated: function() {
    Ext.Msg.confirm(
      "Application Update",
      "This application has just successfully been updated to the latest version. Reload now?",
      function(buttonId) {
        if (buttonId === 'yes') {
          window.location.reload();
        }
      }
    );
  }
});
