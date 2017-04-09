Ext.define("MTAPP.controller.User", {
	extend: 'Ext.app.Controller',
	xtype: 'login',
	config: {
		refs: {
			loginButton: '#loginbutton'
		},
		control: {
			loginButton: {
				tap: function () {

					var username = Ext.getCmp("loginusername").getValue().trim();
					var password = Ext.getCmp("loginpassword").getValue().trim();

					if (!username.length || !password.length) {
						return Ext.Msg.alert('Error', 'Please fill your credentials', function () {
							console.log(arguments);
						});
					}

					Ext.Viewport.setMasked({
						xtype: 'loadmask'
					});

					Ext.Ajax.request({
						url: api_url + '/user/authenticate',
						method: "POST",
						params: {
							email: username,
							password: password
						},
						success: function (response, opts) {

							if (!response.responseText) {
								throw new Error('Critical error');
							}

							// get response
							var resp = JSON.parse(response.responseText);

							try {

								// get user store
								var userStore = Ext.data.StoreManager.get('User');

								// add user info
								userStore.add({
									id_token: resp.data.id_token,
									is_admin: resp.data.admin
								});

								// sync store
								userStore.sync();

								// navifate to main view
								Ext.Viewport.setActiveItem('Main');

							} catch (e) {
								return Ext.Msg.alert('Failure', e);
							} finally {
								Ext.Viewport.setMasked(false);
							}
						},
						failure: function (response, opts) {
							Ext.Viewport.setMasked(false);
							return Ext.Msg.alert('Error', 'Please try again later.');
						}
					});

				}
			}
		}
	}
});
