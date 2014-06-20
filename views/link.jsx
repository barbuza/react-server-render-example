/** @jsx React.DOM */

var React = require("react");
var PropTypes = React.PropTypes;
var dispatch = require("../dispatch");

var Link = React.createClass({
  propTypes: {
    href: PropTypes.string.isRequired,
    children: PropTypes.renderable
  },
  onClick: function(e) {
    if (typeof history.pushState === "function") {
      e.preventDefault();
      window.history.pushState(null, null, this.props.href);
      dispatch.emit("navigate", this.props.href);
    }
  },
  render: function() {
    return this.transferPropsTo(React.DOM.a({onClick: this.onClick}, this.props.children));
  }
});

module.exports = Link;
