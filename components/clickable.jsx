/** @jsx React.DOM */

var React = require("react");
var isMobile = require("../utils/mobile");
var PropTypes = React.PropTypes;

var Clickable = React.createClass({
  propTypes: {
    clickHandler: PropTypes.func.isRequired,
    children: PropTypes.renderable,
    component: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      component: React.DOM.div
    };
  },
  render: function() {
    var eventName = isMobile() ? "onTouchStart" : "onClick";
    var props = {};
    props[eventName] = this.props.clickHandler;
    return this.transferPropsTo(this.props.component(props, this.props.children));
  }
});

module.exports = Clickable;
