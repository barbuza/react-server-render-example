var Router = require("../router");
var expect = require("chai").expect;

describe("Router", function() {

  var router = new Router();
  function addRoute(pattern, name) {
    router.addRoute(name, pattern, function() {
      return name;
    });
  }

  router.set404Route(function() {
    return 404;
  });

  addRoute("/", "index");
  addRoute("/element", "element");
  addRoute("/element/(?<id>\\d+)", "element-d")
  addRoute("/path/(?<first>[^/]+)/(?<second>[^/]+)", "path");

  it("should match routes", function() {
    expect(router.getProps("/")).to.equal("index");
    expect(router.getProps("/element")).to.equal("element");
    expect(router.getProps("/element/1")).to.equal("element-d");
    expect(router.getProps("/element/2")).to.equal("element-d");
    expect(router.getProps("/path/a/b")).to.equal("path");
    expect(router.getProps("")).to.equal(404);
    expect(router.getProps("/element/")).to.equal(404);
    expect(router.getProps("/element/a")).to.equal(404);
    expect(router.getProps("/element/1/")).to.equal(404);
    expect(router.getProps("/path/a")).to.equal(404);
    expect(router.getProps("/path/a/b/c")).to.equal(404);
  });

  it("should reverse urls", function() {
    expect(router.reverse("index", {})).to.equal("/");
    expect(router.reverse("element", {})).to.equal("/element");
    expect(router.reverse("element-d", {id: 1})).to.equal("/element/1");
    expect(router.reverse("element-d", {id: 10})).to.equal("/element/10");
    expect(router.reverse("path", {first: "a", second: "b"})).to.equal("/path/a/b");
  });

});
