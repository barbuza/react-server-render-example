var Router = require("./router");
var router = new Router;
module.exports = router;

router.addRoute("index", "/", require("./actions/index"));
router.addRoute("about", "/about", require("./actions/about"));
router.addRoute("page", "/page/(?<name>.+)", require("./actions/page"));
