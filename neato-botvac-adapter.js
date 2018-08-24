'use strict';

const Neato = require('node-botvac');

const {Adapter} = require('gateway-addon');
const BotvacConnected = require('./neato-botvac-device');

class NeatoAdapter extends Adapter {
  constructor(addonManagerInstance, manifest, _errorCallback) {
    super(addonManagerInstance, 'NeatoBotvacConnectedAdapter', manifest.name);
    addonManagerInstance.addAdapter(this);

    const {email, password} = manifest.moziot.config.credentials;
    const forceLogin = false; // force login if already authorized

    this.neatoClient = new Neato.Client();
    this.neatoClient.authorize(email, password, forceLogin, (error) => {
      if (error) {
        console.log(error);
        console.log('Make sure you\'ve entered valid credentials on ' +
          'the adapter\'s configuration panel');

        _errorCallback(manifest.id, error);
      }

      console.log('Neato adapter login was successful!');
      this.startPairing();
    });
  }

  startPairing() {
    this.neatoClient.getRobots((error, robots) => {
      if (error) {
        console.log(error);
        return;
      }

      for (const robot of robots) {
        this.addDevice(robot);
      }
    });
  }

  addDevice(device) {
    const robotInstance = new BotvacConnected(this, device);
    this.handleDeviceAdded(robotInstance);
  }
}

function loadNeatoAdapter(addonManager, manifest, _errorCallback) {
  new NeatoAdapter(addonManager, manifest, _errorCallback);
}


module.exports = loadNeatoAdapter;
