var webpack = require("webpack");

var plugins = [new webpack.optimize.CommonsChunkPlugin("common.bundle.js")];

if (process.env.NODE_ENV === "production") {
  var UglifyJSPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
  var OccurenceOrderPlugin = require("webpack/lib/optimize/OccurenceOrderPlugin");
  plugins.push(new OccurenceOrderPlugin(true));
  plugins.push(new UglifyJSPlugin());
}

module.exports = {
  cache: true,
  entry: {
    entry: "./views/entry",
    fake: "./webpack-common"
  },
  output: {
    path: __dirname + "/static",
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: "envify-loader!jsx-loader?harmony"}
    ]
  },
  plugins: plugins
};
