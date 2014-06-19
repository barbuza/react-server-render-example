/** @jsx React.DOM */

var React = require("react");
var Const = require("../const");
var Grid = require("./grid");
var Element = require("./element");
var Preloader = require("../components/preloader");
var NotFound = require("./not-found");

var PropTypes = React.PropTypes;

var Counter = React.createClass({

  getInitialState: function() {
    return {
      value: 1
    };
  },

  toggle: function() {
    this.setState({
      value: this.state.value + 1
    });
  },

  render: function() {
    return (
      <span style={{marginLeft: 20, cursor: "pointer"}}
            onClick={this.toggle}>
        {this.state.value}
      </span>
    );
  }

});

var App = React.createClass({

  propTypes: {
    path: PropTypes.string.isRequired,
    entryBundlePath: PropTypes.string.isRequired,
    commonBundlePath: PropTypes.string.isRequired,
    cssPath: PropTypes.string.isRequired,
    pageType: PropTypes.string.isRequired,
    pageData: PropTypes.object.isRequired,
    locked: PropTypes.bool.isRequired,
    activePopup: PropTypes.renderable
  },

  render: function() {

    var injectConfig = "window.appProps=" + JSON.stringify({
      path: this.props.path,
      entryBundlePath: this.props.entryBundlePath,
      commonBundlePath: this.props.commonBundlePath,
      cssPath: this.props.cssPath,
      pageType: this.props.pageType,
      pageData: this.props.pageData,
      locked: this.props.locked
    }) + ";";

    var Page;
    switch (this.props.pageType) {
      case Const.GRID:
        Page = Grid;
        break;
      case Const.ELEMENT:
        Page = Element;
        break;
      default:
        Page = NotFound;
    }

    var lock = null;
    if (this.props.locked) {
      lock = (
        <div id="locked-app">
          <Preloader />
        </div>
      );
    }

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>node render</title>
          <link href="http://fonts.googleapis.com/css?family=Open+Sans:400&subset=latin,cyrillic" rel="stylesheet" type="text/css" />
          <link href={this.props.cssPath} type="text/css" rel="stylesheet" />
        </head>
        <body>
          <header>
            react server render demo
            <Counter />
          </header>
          <section id="workspace">
            {Page(this.props.pageData)}
          </section>
          <footer></footer>
          {this.props.activePopup ? this.props.activePopup : null}
          {lock}
          <script src={this.props.commonBundlePath} />
          <script dangerouslySetInnerHTML={{__html: injectConfig}} />
          <script src={this.props.entryBundlePath} />
        </body>
      </html>
    );
  }

});

module.exports = App;
