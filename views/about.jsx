/** @jsx React.DOM */

var React = require("react");

var About = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired
    }).isRequired
  },
  getDefaultProps: function() {
    return {title: "no about title"};
  },
  render: function() {
    return (<h1>{this.props.data.title}</h1>);
  }
});

module.exports = About;
