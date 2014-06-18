/** @jsx React.DOM */

var React = require("react");
var dispatch = require("../dispatch");
var Popup = require("./popup");

var Element = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      desc: React.PropTypes.string.isRequired
    }).isRequired
  },
  getInitialState: function() {
    return {
      desc: this.props.data.desc
    };
  },
  titleClickHandler: function() {
    dispatch.emit("showPopup", <Popup />);
  },
  appendText: function() {
    this.setState({
      desc: this.state.desc + " foo"
    });
  },
  render: function() {
    return (
      <div className="element">
        <h1 onClick={this.titleClickHandler}>{this.props.data.title}</h1>
        <img src={this.props.data.image} />
        <div onClick={this.appendText} className="elementDescription">{this.state.desc}</div>
      </div>
    );
  }
});

module.exports = Element;
