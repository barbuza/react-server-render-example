/** @jsx React.DOM */

var React = require("react");
var Const = require("../const");

var routes = require("../routes");
var logging = require("../logging");

var Index = require("./index");
var About = require("./about");
var Page = require("./page");
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

    var CurrentPage;
    switch (this.props.pageType) {
      case Const.INDEX:
        CurrentPage = Index;
        break;
      case Const.ABOUT:
        CurrentPage = About;
        break;
      case Const.PAGE:
        CurrentPage = Page;
        break;
      default:
        CurrentPage = NotFound;
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
              <Link href={routes.reverse("index")}>index</Link>
              &nbsp;
              <Link href={routes.reverse("about")}>about</Link>
              &nbsp;
              <Link href={routes.reverse("page", {name: "1"})}>page 1</Link>
              &nbsp;
              <Link href={routes.reverse("page", {name: "2"})}>page 2</Link>
              &nbsp;
              <Link href="/broken-link">broken link</Link>
            </nav>
          </header>
          <section id="workspace">
            <CurrentPage data={this.props.pageData} />
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
