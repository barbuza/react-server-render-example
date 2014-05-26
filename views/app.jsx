/** @jsx React.DOM */

var React = require("react");
var Const = require("../const");

var routes = require("../routes");
var logging = require("../logging");

var Index = require("./index");
var About = require("./about");
var NotFound = require("./not-found");
var Link = require("./link");

var App = React.createClass({

  propTypes: {
    path: React.PropTypes.string.isRequired,
    entryBundlePath: React.PropTypes.string.isRequired,
    commonBundlePath: React.PropTypes.string.isRequired,
    pageType: React.PropTypes.string.isRequired,
    pageData: React.PropTypes.object.isRequired,
    locked: React.PropTypes.bool.isRequired
  },

  render: function() {

    var injectConfig = "window.appProps=" + JSON.stringify({
      path: this.props.path,
      entryBundlePath: this.props.entryBundlePath,
      commonBundlePath: this.props.commonBundlePath,
      pageType: this.props.pageType,
      pageData: this.props.pageData,
      locked: this.props.locked
    }) + ";";

    var Page;
    switch (this.props.pageType) {
      case Const.INDEX:
        Page = Index;
        break;
      case Const.ABOUT:
        Page = About;
        break;
      default:
        Page = NotFound;
    }

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>node render</title>
        </head>
        <body>
          <header>
            <nav>
              <Link href={routes.index()}>index</Link>
              &nbsp;
              <Link href={routes.about()}>about</Link>
              &nbsp;
              <Link href="/broken-link">broken link</Link>
            </nav>
          </header>
          <section id="workspace">
            <Page data={this.props.pageData} />
          </section>
          <footer></footer>
          <script src={this.props.commonBundlePath} />
          <script dangerouslySetInnerHTML={{__html: injectConfig}} />
          <script src={this.props.entryBundlePath} />
        </body>
      </html>
    );
  }

});

module.exports = App;
