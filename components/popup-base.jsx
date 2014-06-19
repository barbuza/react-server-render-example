/** @jsx React.DOM */

var React = require("react");
var dispatch = require("../dispatch");
var EventListener = require("react/lib/EventListener");
var cx = require("react/lib/cx");

var PopupBase = React.createClass({

  propTypes: {
    children: React.PropTypes.component.isRequired
  },

  getInitialState: function() {
    return {
      visible: false,
      dispose: false,
      listener: null
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.visible !== this.state.visible || nextState.dispose !== this.state.dispose;
  },

  componentDidMount: function() {
    setTimeout(this.showPopup, 0);
    var closeBtn = this.getDOMNode().querySelector("[data-role='close']");
    if (closeBtn) {
      var listener = EventListener.listen(closeBtn, "click", this.closePopup);
      this.setState({
        listener: listener
      });
    }
  },

  componentWillUnmount: function() {
    if (this.state.listener) {
      this.state.listener.remove();
    }
  },

  closePopup: function() {
    if (this.state.listener) {
      this.state.listener.remove();
      this.setState({
        listener: null
      });
    }
    this.setState({
      visible: false,
      dispose: true
    });
    setTimeout(() => dispatch.emit("hidePopup"), 500);
  },

  showPopup: function() {
    this.setState({
      visible: true,
      dispose: false
    });
  },

  render: function() {
    var classes = cx({
      cmpPopupOverlay: true,
      cmpPopupVisible: this.state.visible,
      cmpPopupDispose: this.state.dispose
    });
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = PopupBase;
