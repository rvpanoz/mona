/**
 * [singleton global variables]
 * @type {Boolean}
 */
Ext.define('mona.utils.globals', {
  singleton: true,
  config: {
    idToken: null
  },
  constructor: function(config) {
    this.initConfig(config);
  }
});
