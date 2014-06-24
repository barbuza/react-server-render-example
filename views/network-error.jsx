/** @jsx React.DOM */

var React = require("react");
var PopupBase = require("../components/popup-base");
var dispatch = require("../dispatch");
var logging = require("../utils/logging");

var NetworkErrorPopup = React.createClass({
  render: function() {
    return (
      <PopupBase>
        <div id="network-error">network error, reload page</div>
      </PopupBase>
    );
  }
});

module.exports = function() {
  logging.warn("show network error popup");
  dispatch.emit("showPopup", NetworkErrorPopup());
};
