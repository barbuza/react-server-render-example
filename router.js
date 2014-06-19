var XRegExp = require("xregexp").XRegExp;
var dispatch = require("./dispatch");

var Route = function(pattern, handler) {
  this.source = pattern;
  this.pattern = XRegExp("^" + pattern + "$");
  this.handler = handler;
};

Route.prototype.match = function(path) {
  var result = XRegExp.exec(path, this.pattern);
  return result;
};

Route.prototype.reverse = function(params) {
  var path = this.source;
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      path = path.replace(new RegExp("\\(\\?<" + key + ">[^)]+\\)"), params[key]);
    }
  }
  return path;
};

var Router = function() {
  this.path = undefined;
  this.routes = [];
  this.namedRoutes = {};
};

Router.prototype.getPath = function() {
  return this.path || window.location.pathname;
};

Router.prototype.onStateChange = function(ev) {
  if (window.location.pathname === this.path) return;

  var path = window.location.pathname;
  this.path = path;

  this.app.setProps({
    locked: true
  });

  this.getProps(this.getPath()).then(
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
  this.app = app;
  window.addEventListener("popstate", this.onStateChange.bind(this));
  dispatch.on("showPopup", this.showPopup.bind(this));
  dispatch.on("hidePopup", this.hidePopup.bind(this));
};

Router.prototype.showPopup = function(popup) {
  this.app.setProps({
    activePopup: popup
  });
};

Router.prototype.hidePopup = function() {
  this.app.setProps({
    activePopup: null
  });
};

Router.prototype.addRoute = function(name, pattern, handler) {
  var route = new Route(pattern, handler);
  this.routes.unshift(route);
  this.namedRoutes[name] = route;
};

Router.prototype.set404Route = function(handler) {
  this.handler404 = handler;
};

Router.prototype.setErrorHandler = function(handler) {
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
  return this.namedRoutes[name].reverse(params);
};

module.exports = Router;
