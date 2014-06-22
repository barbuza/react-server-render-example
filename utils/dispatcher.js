var EventEmitter = require("events").EventEmitter;

var Dispatcher = function() {
  EventEmitter(this);
};

Dispatcher.prototype = Object.create(EventEmitter.prototype);

Dispatcher.prototype.emitAfter = function(duration) {
  var args = Array.prototype.slice.call(arguments, 1);
  var self = this;
  return setTimeout(function() {
    self.emit.apply(self, args);
  }, duration);
};

module.exports = Dispatcher;
