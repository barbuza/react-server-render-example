var Router = require("../utils/router");

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
    expect(router.getProps("/")).toBe("index");
    expect(router.getProps("/element")).toBe("element");
    expect(router.getProps("/element/1")).toBe("element-d");
    expect(router.getProps("/element/2")).toBe("element-d");
    expect(router.getProps("/path/a/b")).toBe("path");
    expect(router.getProps("")).toBe(404);
    expect(router.getProps("/element/")).toBe(404);
    expect(router.getProps("/element/a")).toBe(404);
    expect(router.getProps("/element/1/")).toBe(404);
    expect(router.getProps("/path/a")).toBe(404);
    expect(router.getProps("/path/a/b/c")).toBe(404);
  });

  it("should reverse urls", function() {
    expect(router.reverse("index", {})).toBe("/");
    expect(router.reverse("element", {})).toBe("/element");
    expect(router.reverse("element-d", {id: 1})).toBe("/element/1");
    expect(router.reverse("element-d", {id: 10})).toBe("/element/10");
    expect(router.reverse("path", {first: "a", second: "b"})).toBe("/path/a/b");
  });

});
