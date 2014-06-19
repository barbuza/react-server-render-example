
var EventListener = require("react/lib/EventListener");

var DomMixin = {

  querySelector: function() {
    var node = this.getDOMNode();
    return node.querySelector.apply(node, Array.prototype.slice.call(arguments));
  },

  querySelectorAll: function() {
    var node = this.getDOMNode();
    return node.querySelectorAll.apply(node, Array.prototype.slice.call(arguments));    
  },

  addEventListener: function(target, eventName, handler) {
    return EventListener.listen(target, eventName, handler);
  },

  setStateDefer: function(update) {
    return setTimeout((function() {
      this.setState(update);
    }).bind(this), 0);
  }

};

module.exports = DomMixin;
