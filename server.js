var express = require("express");
var React = require("react");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var fs = require("fs");
var morgan = require("morgan");
var crypto = require("crypto");
var superagent = require("superagent");

require("node-jsx").install({extension: ".jsx", harmony: true});

var app = express();
var ReactApp = require("./views/app");
var ReactRouter = require("./routes");
var Const = require("./const");

if (process.env.NODE_ENV != "production") {
  app.use(webpackDevMiddleware(webpack(require("./webpack.config"))));
}

app.use(express.static("static"));

app.use(morgan("short"));

var commonBundlePath = "/common.bundle.js";
var entryBundlePath = "/entry.bundle.js";
if (process.env.NODE_ENV === "production") {
  var bundleHash = crypto.createHash("sha1");
  bundleHash.update(fs.readFileSync("static" + commonBundlePath));
  commonBundlePath += "?" + bundleHash.digest("hex");

  bundleHash = crypto.createHash("sha1");
  bundleHash.update(fs.readFileSync("static" + entryBundlePath));
  entryBundlePath += "?" + bundleHash.digest("hex");
}

app.get("/riak/*", function(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    superagent
      .get("http://127.0.0.1:8098" + req.path)
      .end(function(response) {
        var headers = {
          "Content-Type": response.type
        };
        if (response.headers.etag) {
          headers["ETag"] = response.headers.etag;
        }
        res.writeHead(response.statusCode, headers);
        res.end(response.text);
      });    
  } else {
    if (req.path === "/riak/test/index") {
      res.send({title: "index"});
    } else if (req.path === "/riak/test/about") {
      res.send({title: "about"});
    } else {
      res.writeHead(404, {});
      res.end("404");
    }
  }
});

app.get("/*", function(req, res, next) {
  ReactRouter.getProps(req.path).then(function(data) {
    var component = ReactApp({
      path: req.path,
      entryBundlePath: entryBundlePath,
      commonBundlePath: commonBundlePath,
      pageType: data.pageType,
      pageData: data.pageData,
      locked: false
    });
    var html = "<!doctype html>\n" + React.renderComponentToString(component);
    var statusCode = data.pageType === Const.NOT_FOUND ? 404 : 200;
    res.writeHead(statusCode, {
      "Content-Type": "text/html"
    });
    res.end(html);
  }, next);
});

app.listen(8080, function() {
  console.log("serving on port 8080");
});
