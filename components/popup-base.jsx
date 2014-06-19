/** @jsx React.DOM */

var React = require("react");
var dispatch = require("../dispatch");
var cx = require("react/lib/cx");
var DomMixin = require("../utils/dom-mixin");

var PopupBase = React.createClass({

  mixins: [DomMixin],

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
    this.setStateDefer({
      visible: true,
      dispose: false
    });
    var closeBtn = this.querySelector("[data-role='close']");
    if (closeBtn) {
      var listener = this.addEventListener(closeBtn, "click", this.closePopup);
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
    dispatch.emitAfter(500, "hidePopup");
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
