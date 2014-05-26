var baseAction = require("./base");
var remote = require("../remote");
var Const = require("../const");

module.exports = baseAction(Const.INDEX, false, function(resolve, reject) {
  remote.get("/riak/test/index").then(resolve);
});
