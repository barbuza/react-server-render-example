var express = require("express");
var React = require("react");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var fs = require("fs");
var morgan = require("morgan");
var crypto = require("crypto");

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

var cssPath = "/app.css";
if (process.env.NODE_ENV === "production") {
  cssPath = "/app.min.css";
  var cssBundleHash = crypto.createHash("sha1");
  cssBundleHash.update(fs.readFileSync("static" + cssPath));
  cssPath += "?" + cssBundleHash.digest("hex");
}

app.get("/riak/*", function(req, res, next) {
  if (req.path === "/riak/test/grid") {
    res.send({
      items: [{
        id: 1,
        title: "Форс-Мажоры",
        image: "http://st7.imhonet.ru/element/7e/b2/7eb2a71bfa6e8a266877ae228325e4d2.jpg"
      }, {
        id: 2,
        title: "Пепел",
        image: "http://st8.imhonet.ru/element/85/d1/85d13f58cee1078c90bf8b4bb2568daa.jpg"
      }, {
        id: 3,
        title: "Mass Effect 3",
        image: "http://stb.imhonet.ru/element/b4/86/b486187cfcc9b1b2df8d4e935077e8e4.jpg"
      }]
    });
  } else if (req.path === "/riak/test/element-1") {
    res.send({
      id: 1,
      title: "Форс-Мажоры",
      image: "http://st7.imhonet.ru/element/7e/b2/7eb2a71bfa6e8a266877ae228325e4d2.jpg" ,
      desc: "Популярный американский сериал «Форс-мажоры» (Suits) вышел в прокат в 2011 году. Его драматический сюжет рассказывает историю юриста-самоучки Майка Росса, который выдавал себя за выпускника Гарварда. Его нанимают к одному из лучших адвокатов Нью-Йорка." 
    });
  } else if (req.path === "/riak/test/element-2") {
    res.send({
      id: 2,
      title: "Пепел",
      image: "http://st8.imhonet.ru/element/85/d1/85d13f58cee1078c90bf8b4bb2568daa.jpg",
      desc: "«Пепел» – телевизионный многосерийный фильм Вадима Перельмана («Дом из песка и тумана»), события которого разворачиваются в период с 1938 по 1948 годы."
    });
  } else if (req.path === "/riak/test/element-3") {
    res.send({
      id: 3,
      title: "Mass Effect 3",
      image: "http://stb.imhonet.ru/element/b4/86/b486187cfcc9b1b2df8d4e935077e8e4.jpg",
      desc: "Игра Mass Effect 3 — это третья часть культовой серии научно-фантастических RPG от канадской компании BioWare."
    });
  } else {
    res.writeHead(404, {});
    res.end("404");
  }
});

app.get("/*", function(req, res, next) {
  ReactRouter.getProps(req.path).then(function(data) {
    var component = ReactApp({
      path: req.path,
      entryBundlePath: entryBundlePath,
      commonBundlePath: commonBundlePath,
      cssPath: cssPath,
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
