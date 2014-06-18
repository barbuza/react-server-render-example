var superagent = require("superagent");
var Promise = require("es6-promise").Promise;
var logging = require("./logging");

var Remote = function() {

};

if (typeof window === "undefined") {

  Remote.prototype.get = function(uri) {
    return new Promise(function(resolve, reject) {
      logging.info("server loading", uri);
      superagent
        .get("http://127.0.0.1:8080" + uri)
        .end(function(response) {
          resolve(response.body);
        });
    });
  };


} else {

  Remote.prototype.get = function(uri) {
    return new Promise(function(resolve, reject) {
      logging.info("client loading", uri);
      superagent
        .get(uri)
        .end(function(response) {
          resolve(response.body);
        });
    });
  };

}

module.exports = new Remote();
