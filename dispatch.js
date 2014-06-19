var EventEmitter = require("events").EventEmitter;

var Dispatcher = function() {
  EventEmitter(this);
};

Dispatcher.prototype = Object.create(EventEmitter.prototype);

Dispatcher.prototype.emitAfter = function(duration) {
  var args = Array.prototype.slice.call(arguments, 1);
  return setTimeout((function() {
    this.emit.apply(this, args);
  }).bind(this), duration);
};

module.exports = new Dispatcher();
