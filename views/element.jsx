/** @jsx React.DOM */

var React = require("react");
var dispatch = require("../dispatch");
var Clickable = require("../components/clickable");
var Popup = require("./popup");
var PropTypes = React.PropTypes;

var Element = React.createClass({
  propTypes: {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      desc: this.props.desc
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
        <Clickable clickHandler={this.titleClickHandler} component={React.DOM.h1}>{this.props.title}</Clickable>
        <img src={this.props.image} />
        <Clickable clickHandler={this.appendText} component={React.DOM.div} className="elementDescription">{this.state.desc}</Clickable>
      </div>
    );
  }
});

module.exports = Element;
