/** @jsx React.DOM */

var React = require("react");
var PopupBase = require("../components/popup-base");

var Popup = React.createClass({

  render: function() {
    return (
      <PopupBase>
        <div className="popup">
          <div className="close" data-role="close">close</div>
        </div>
      </PopupBase>
    );
  }
});

module.exports = Popup;
