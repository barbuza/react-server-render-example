var Promise = require("es6-promise").Promise;

var browserCache = {};

module.exports = function baseAction(pageType, useCache, generator) {
  return function(pathData) {
    
    if (typeof window !== "undefined" && useCache && browserCache[pageType]) {
      return new Promise(function(resolve, reject) {
        resolve({
          pageType: pageType,
          pageData: browserCache[pageType]
        });
      });
    }

    return new Promise(function(resolve, reject) {
      generator(function(pageData) {
        if (typeof pageData === "undefined") {
          pageData = {};
        }
        if (typeof window !== "undefined" && useCache) {
          browserCache[pageType] = pageData;
        }
        resolve({
          pageType: pageType,
          pageData: pageData
        });
      }, reject, pathData);
    });

  }
};
