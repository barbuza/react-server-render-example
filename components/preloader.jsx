/** @jsx React.DOM */

var React = require("react");

var Preloader = React.createClass({
  render: function() {
    return (
      <div className="cmpPreloader">
        <i /><i /><i />
      </div>
    );
  }
});

module.exports = Preloader;
