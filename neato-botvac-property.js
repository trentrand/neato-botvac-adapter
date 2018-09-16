const {Property} = require('gateway-addon');

class NeatoBotvacProperty extends Property {
  constructor(device, name, descr, value) {
    super(device, name, descr);
    this.setCachedValue(value);
  }

  /**
   * @param {boolean|number} value
   * @return {Promise} a promise which resolves to the updated value.
   */
  setValue(value) {
    const changed = this.value !== value;
    return new Promise((resolve) => {
      this.setCachedValue(value);
      resolve(this.value);
      if (changed) {
        this.device.notifyPropertyChanged(this);
      }
    });
  }
}

module.exports = NeatoBotvacProperty;
