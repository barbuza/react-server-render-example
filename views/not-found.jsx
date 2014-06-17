/** @jsx React.DOM */

var React = require("react");

var NotFound = React.createClass({
  render: function() {
    return <h1 id="error404">404</h1>;
  }
});

module.exports = NotFound;
