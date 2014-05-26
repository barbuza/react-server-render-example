/** @jsx React.DOM */

var React = require("react");
var ReactMount = require("react/lib/ReactMount");
ReactMount.allowFullPageRender = true;

var logging = require("../logging");
logging.info("app starting");

var App = require("./app");
var router = require("../router");
var app = React.renderComponent(App(window.appProps), document);
router.attach(app);
