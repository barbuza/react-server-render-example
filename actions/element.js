var baseAction = require("./base");
var remote = require("../utils/remote");
var Const = require("../const");

module.exports = baseAction(Const.ELEMENT, true, function(resolve, reject, pathData) {
  remote.get("/riak/test/element-" + pathData.id).then(resolve, reject);
});
