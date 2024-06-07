const EventEmitter = require('node:events');

class CustomEventEmitter extends EventEmitter {}

module.exports = new CustomEventEmitter();
