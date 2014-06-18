/** @jsx React.DOM */

var React = require("react");
var dispatch = require("../dispatch");

var Popup = React.createClass({

  closeClickHandler: function() {
    dispatch.emit("hidePopup");
  },

  render: function() {
    return (
      <div className="popup">
        <div className="popupInner">
          <div className="popupClose" onClick={this.closeClickHandler}>close</div>
        </div>
      </div>
    );
  }
});

module.exports = Popup;
