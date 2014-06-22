var EventListener = require("react/lib/EventListener");
var shallowEqual = require("react/lib/shallowEqual");
var routes = require("../routes");

var _ = require("lodash");

var BaseMixin = {

  querySelector: function(selector) {
    return this.getDOMNode().querySelector(selector);
  },

  querySelectorAll: function(selector) {
    return this.getDOMNode().querySelectorAll(selector);
  },

  addEventListener: function(target, eventName, handler) {
    return EventListener.listen(target, eventName, handler);
  },

  setStateDefer: function(update) {
    var self = this;
    _.defer(function() {
      if (self.isMounted()) {
        self.setState(update);
      }
    });
  },

  equalObjects: function(a, b) {
    var keys = Array.prototype.slice.call(arguments, 2);
    if (! keys.length) {
      return shallowEqual(a, b);
    }
    return shallowEqual(_.pick(a, keys), _.pick(b, keys));
  },

  setStateTimeout: function(stateVarName, duration, func) {
    var update = {};
    update[stateVarName] = setTimeout(func, duration);
    this.setState(update);
  },

  clearStateTimeout: function(stateVarName) {
    if (this.state[stateVarName]) {
      clearTimeout(this.state[stateVarName]);
      var update = {};
      update[stateVarName] = null;
      this.setState(update);
    }
  },

  safeSetState: function(update) {
    if (this.isMounted()) {
      this.setState(update);
    }
  },

  stateSetter: function(update) {
    var self = this;
    return function() {
      self.safeSetState(update);
    }
  },

  reverseUrl: function(name, args) {
    return routes.reverse(name, args);
  }

};

module.exports = BaseMixin;
