'use strict';

const Property = require('./property');

class ReadonlyProperty extends Property {
  constructor(device, description, value) {
    description.writable = false;
    super(device, name, description, value);
  }

  setValue(_value) {
    return Promise.reject('Read only property');
  }
}

module.exports = ReadonlyProperty;
