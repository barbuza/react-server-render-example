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
  this.app = app;
  var self = this;

  window.addEventListener("popstate", function() {
    dispatch.emit("navigate", window.location.pathname);
  });

  dispatch.on("navigate", function(path) {
    self.navigate(path);
  });

  dispatch.on("showPopup", function(popup) {
    self.showPopup(popup);
  });

  dispatch.on("hidePopup", function() {
    self.hidePopup();
  });
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
