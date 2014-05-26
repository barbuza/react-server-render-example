/** @jsx React.DOM */

var React = require("react");

var Link = React.createClass({
  propTypes: {
    href: React.PropTypes.string.isRequired,
    children: React.PropTypes.renderable
  },
  onClick: function(e) {
    if (typeof history.pushState === "function") {
      e.preventDefault();
      window.history.pushState({}, "", this.props.href);
      var ev = document.createEvent("HTMLEvents");
      ev.initEvent("popstate", true, true);
      ev.eventName = "popstate";
      window.dispatchEvent(ev);
    }
  },
  render: function() {
    return this.transferPropsTo(React.DOM.a({onClick: this.onClick}, this.props.children));
  }
});

module.exports = Link;
