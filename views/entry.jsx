/** @jsx React.DOM */

var React = require("react");
var ReactMount = require("react/lib/ReactMount");
ReactMount.allowFullPageRender = true;

var isMobile = require("../utils/mobile.js");
if (isMobile()) {
  React.initializeTouchEvents(true);
}

var logging = require("../logging");
logging.info("app starting");

var App = require("./app");
var routes = require("../routes");
var app = React.renderComponent(App(window.appProps), document);
routes.attach(app);
