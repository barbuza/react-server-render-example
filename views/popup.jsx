/** @jsx React.DOM */

var React = require("react");
var dispatch = require("../dispatch");
var cx = require("react/lib/cx");

var Popup = React.createClass({

  closeClickHandler: function() {
    this.setState({
      visible: false,
      dispose: true
    });
    setTimeout(function() {
      dispatch.emit("hidePopup");
    }, 500);
  },

  getInitialState: function() {
    return {
      visible: false,
      dispose: false
    };
  },

  componentDidMount: function() {
    setTimeout(this.show, 0);
  },

  show: function() {
    this.setState({
      visible: true
    });
  },

  render: function() {
    var classes = cx({
      popup: true,
      popupVisible: this.state.visible,
      popupDispose: this.state.dispose
    });
    return (
      <div className={classes}>
        <div className="popupInner">
          <div className="popupClose" onClick={this.closeClickHandler}>close</div>
        </div>
      </div>
    );
  }
});

module.exports = Popup;
