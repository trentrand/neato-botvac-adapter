'use strict';

const {Device} = require('gateway-addon');
const Property = require('./neato-botvac-property');
const schema = require('./neato-botvac-schema');

const DEVICE_PROPS = {
  name: 'name',
  id: '_serial',
  eco: 'eco',
  navigationMode: 'navigationMode',
  spotWidth: 'spotWidth',
  spotHeight: 'spotHeight',
  spotRepeat: 'spotRepeat',
  isCharging: 'isCharging',
  isDocked: 'isDocked',
  isScheduleEnabled: 'isScheduleEnabled',
  dockHasBeenSeen: 'dockHasBeenSeen',
  charge: 'charge',
  canStart: 'canStart',
  canStop: 'canStop',
  canPause: 'canPause',
  canResume: 'canResume',
  canGoToBase: 'canGoToBase',
};

class BotvacConnected extends Device {
  constructor(adapterInstance, device) {
    super(adapterInstance, device._serial);

    this.name = device.name;
    this.api = device;

    if (schema.properties) {
      for (const property of schema.properties) {
        this.registerProperty(
          property.name,
          this.getDeviceProperty(device, property.name),
          property.metadata
        );
      }
    }
  }

  getDeviceProperty(device, propertyName) {
    return device[DEVICE_PROPS[propertyName]];
  }

  registerProperty(name, value, metadata) {
    const property = new Property(this, name, metadata, value);
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

  notifyPropertyChanged(property) {
    super.notifyPropertyChanged(property);
    console.log('property', property);
    switch (property.name) {
      case 'isScheduleEnabled': {
        if (property.value) {
          this.api.enableSchedule();
        } else {
          this.api.disableSchedule();
        }
        break;
      }
      default:
        console.warn('Unknown property:', property.name);
    }
  }

  updateActionLabel(actionName, label) {
    this.actions.get(actionName).label = label;
  }
}

module.exports = BotvacConnected;
