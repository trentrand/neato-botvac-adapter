'use strict';

const {Adapter, Device, Property} = require('gateway-addon');

class NeatoAdapter extends Adapter {
  constructor(addonManagerInstance, manifest, _errorCallback) {
    super(addonManagerInstance, 'NeatoBotvacConnectedAdapter', manifest.name);
    addonManagerInstance.addAdapter(this);
  }
}

function loadNeatoAdapter(addonManager, manifest, _errorCallback) {
  new NeatoAdapter(addonManager, manifest, _errorCallback);
}


module.exports = loadNeatoAdapter;
