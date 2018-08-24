'use strict';

const {Device, Property} = require('gateway-addon');

class BotvacConnected extends Device {
  constructor(adapterInstance, device) {
    super(adapterInstance, device._serial);

    this.device = device; // Use this reference to command your Botvac device
  }

  registerProperty(name, propertyDescription) {
    const property = new Property(this, name, propertyDescription);
    this.properties.set(name, property);
  }

  updateProperty(propertyName, value) {
    if (this.hasProperty(propertyName)) {
      const property = this.findProperty(propertyName);

      if (property && property.value != value) {
        property.setCachedValue(value);
        this.notifyPropertyChanged(property);
      }
    } else {
      console.log('Device property does not exist', propertyName);
    }
  }
}

module.exports = BotvacConnected;
