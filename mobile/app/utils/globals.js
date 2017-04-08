/**
 * [singleton global variables]
 * @type {Boolean}
 */
Ext.define('MTAPP.utils.globals', {
  singleton: true,
  config: {
    idToken: null
  },
  constructor: function(config) {
    this.initConfig(config);
  }
});
