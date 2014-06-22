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
  clickHandler: function(e) {
    this.cancelEvent(e);
    this.props.clickHandler(e);
  },
  cancelEvent: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  render: function() {
    var props;
    if (isMobile()) {
      props = {
        onTouchStart: this.clickHandler,
        onClick: this.cancelEvent
      };
    } else {
      props = {
        onClick: this.clickHandler
      };
    }
    return this.transferPropsTo(this.props.component(props, this.props.children));
  }
});

module.exports = Clickable;
