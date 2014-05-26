
var superagent = require("superagent");
var Promise = require("es6-promise").Promise;

var routes = require("./routes");
var Const = require("./const");
var logging = require("./logging");


var Router = function() {
  this.path = undefined;
};

Router.prototype.setPath = function(path) {
  this.path = path;
};

Router.prototype.getPath = function() {
  return this.path || window.location.pathname;
};

Router.prototype.onStateChange = function(ev) {
  if (window.location.pathname === this.path) return;

  var path = window.location.pathname;
  this.setPath(path);

  this.app.setProps({
    locked: true
  });

  this.getProps(this.getPath()).then(
    function(state) {
      this.app.setProps({
        pageType: state.pageType,
        pageData: state.pageData,
        locked: false
      });
    }.bind(this),
    function(err) {
      logging.error(err);
    }
  );

};

Router.prototype.attach = function(app) {
  this.app = app;
  window.addEventListener("popstate", this.onStateChange.bind(this));
};

Router.prototype.getProps = function(path) {
  if (path === routes.index()) return this.indexAction();
  if (path === routes.about()) return this.aboutAction();
  return this.notFoundAction();
};

Router.prototype.indexAction = require("./actions/index");
Router.prototype.aboutAction = require("./actions/about");
Router.prototype.notFoundAction = require("./actions/not-found");

module.exports = new Router;
