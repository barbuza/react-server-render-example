/** @jsx React.DOM */

var React = require("react");

var Page = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired
    }).isRequired
  },
  getDefaultProps: function() {
    return {title: "no page title"};
  },
  render: function() {
    return (<h1>{this.props.data.title}</h1>);
  }
});

module.exports = Page;
