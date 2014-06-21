var superagent = require("superagent");
var Promise = require("es6-promise").Promise;
var logging = require("./logging");

var Remote = function() {

};

if (typeof window === "undefined") {

  Remote.prototype.get = function(uri) {
    return new Promise(function(resolve, reject) {
      logging.info("server loading", uri);
      var serverHost = process.env.SERVER_HOST || "http://127.0.0.1:8080";
      superagent
        .get(serverHost + uri)
        .end(function(response) {
          if (response.ok) {
            resolve(response.body);
          } else {
            reject();
          }
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
          setTimeout(function() {
            if (response.ok) {
              resolve(response.body);
            } else {
              reject();
            }
          }, 1000);
        });
    });
  };

}

module.exports = new Remote();
