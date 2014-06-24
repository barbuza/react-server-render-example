var XRegExp = require("xregexp").XRegExp;
var ReactComponent = require("react/lib/ReactComponent");
var dispatch = require("./dispatch");
var invariant = require("react/lib/invariant");
var _ = require("lodash");

var Route = function(pattern, handler) {
  invariant(
    _.isString(pattern),
    "Route first arg should be string, %s given",
    typeof pattern
  );
  invariant(
    _.isFunction(handler),
    "Route second arg should be function, %s given",
    typeof handler
  );
  this.source = pattern;
  this.pattern = XRegExp("^" + pattern + "$");
  this.handler = handler;
};

Route.prototype.match = function(path) {
  invariant(
    _.isString(path),
    "Route#match first arg should be string, %s given",
    typeof path
  );
  var result = XRegExp.exec(path, this.pattern);
  return result;
};

Route.prototype.reverse = function(params) {
  invariant(
    _.isObject(params),
    "Route#reverse arg should be object, %s given",
    typeof params
  );
  var path = this.source;
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      path = path.replace(new RegExp("\\(\\?<" + key + ">[^)]+\\)"), params[key]);
    }
  }
  return path;
};

var Router = function() {
  this.path = typeof window === "undefined" ? null : window.location.pathname;
  this.routes = [];
  this.namedRoutes = {};
};

Router.prototype.navigate = function(path) {

  if (path === this.path) {
    return;
  }

  this.path = path;

  this.app.setProps({
    locked: true
  });

  this.getProps(this.path).then(
    function(props) {
      this.app.setProps({
        pageType: props.pageType,
        pageData: props.pageData,
        locked: false,
        activePopup: null
      });
    }.bind(this),
    this.errorHandler
  );

};

Router.prototype.attach = function(app) {

  invariant(
    ReactComponent.isValidComponent(app),
    "Router#attach arg should be React component, %s given",
    typeof popup
  );

  this.app = app;
  var self = this;

  window.addEventListener("popstate", function() {
    dispatch.emit("navigate", window.location.pathname);
  });

  dispatch.on("navigate", function(path) {
    self.navigate(path);
  });

};

Router.prototype.addRoute = function(name, pattern, handler) {
  invariant(
    _.isString(name),
    "Router#addRoute first arg should be string, %s given",
    typeof name
  );
  var route = new Route(pattern, handler);
  this.routes.unshift(route);
  this.namedRoutes[name] = route;
};

Router.prototype.set404Route = function(handler) {
  invariant(
    _.isFunction(handler),
    "Router#set404Route arg should be function, %s given",
    typeof handler
  );
  this.handler404 = handler;
};

Router.prototype.setErrorHandler = function(handler) {
  invariant(
    _.isFunction(handler),
    "Router#setErrorHandler arg should be function, %s given",
    typeof handler
  );
  this.errorHandler = handler;
};

Router.prototype.getProps = function(path) {
  var result;
  for (var i = this.routes.length - 1; i >= 0; i--) {
    result = this.routes[i].match(path);
    if (result) {
      return this.routes[i].handler(result);
    }
  }
  return this.handler404();
};

Router.prototype.reverse = function(name, params) {
  invariant(
    _.isString(name),
    "Router#reverse first arg should be string, %s given",
    typeof name
  );
  invariant(
    _.isObject(params),
    "Router#reverse second arg should be object, %s given",
    typeof params
  );
  return this.namedRoutes[name].reverse(params);
};

module.exports = Router;
