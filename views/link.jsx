/** @jsx React.DOM */

var React = require("react");
var PropTypes = React.PropTypes;
var dispatch = require("../utils/dispatch");
var isMobile = require("../utils/mobile");

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
  preventDefault: function(e) {
    e.preventDefault();
  },
  render: function() {
    if (isMobile()) {
      return this.transferPropsTo(<a onClick={this.preventDefault}
                                     onTouchStart={this.onClick}>{this.props.children}</a>);
    } else {
      return this.transferPropsTo(<a onClick={this.onClick}>{this.props.children}</a>);
    }
  }
});

module.exports = Link;
