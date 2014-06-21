var Promise = require("es6-promise").Promise;
var logging = require("../utils/logging");

var browserCache = {};

module.exports = function baseAction(pageType, useCache, generator) {
  return function(pathData) {

    var cacheKey = pageType;
    if (pathData) {
      for (var i = pathData.length - 1; i >= 0; i--) {
        cacheKey += "|" + pathData[i];
      }
    }

    if (typeof window !== "undefined" && useCache && browserCache[cacheKey]) {
      logging.info("from cache", cacheKey);
      return new Promise(function(resolve, reject) {
        resolve({
          pageType: pageType,
          pageData: browserCache[cacheKey]
        });
      });
    }

    return new Promise(function(resolve, reject) {
      generator(function(pageData) {
        if (typeof pageData === "undefined") {
          pageData = {};
        }
        if (typeof window !== "undefined" && useCache) {
          logging.info("caching", cacheKey);
          browserCache[cacheKey] = pageData;
        }
        resolve({
          pageType: pageType,
          pageData: pageData
        });
      }, reject, pathData);
    });

  };
};
