/** @jsx React.DOM */

var React = require("react");

var Index = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired
    }).isRequired
  },
  getDefaultProps: function() {
    return {title: "no index title"};
  },
  render: function() {
    return (<h1>{this.props.data.title}</h1>);
  }
});

module.exports = Index;
