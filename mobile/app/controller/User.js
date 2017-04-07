Ext.define("mona.controller.User", {
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
						url: api.url_dev + '/user/authenticate',
						method: "POST",
						params: {
							email: username,
							password: password
						},
						success: function (response, opts) {

							if (!response.responseText) {
								throw new Error('Invalid response');
							}

							// get response
							var resp = JSON.parse(response.responseText);
							console.log(resp);

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
								Ext.Viewport.setActiveItem(Ext.Viewport.add(Ext.create('mona.view.Main')));
							} catch (e) {
								Ext.Msg.alert('Failure', e);
							} finally {
								Ext.Viewport.setMasked(false);
							}
						},
						failure: function (response, opts) {
							Ext.Viewport.setMasked(false);

							if (!response.responseText)
								return Ext.Msg.alert('Error', 'Server is not responding.');

							var resp = JSON.parse(response.responseText);
							return Ext.Msg.alert('Failure', resp.message);
						}
					});

				}
			}
		}
	}
});
