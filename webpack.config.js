var webpack = require("webpack");

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
  plugins: [new webpack.optimize.CommonsChunkPlugin("common.bundle.js")]
};
