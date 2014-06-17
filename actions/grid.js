var baseAction = require("./base");
var remote = require("../remote");
var Const = require("../const");

module.exports = baseAction(Const.GRID, true, function(resolve, reject) {
  remote.get("/riak/test/grid").then(resolve);
});
