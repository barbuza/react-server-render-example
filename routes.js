var Router = require("./router");
var router = new Router();
module.exports = router;

router.addRoute("grid", "/", require("./actions/grid"));
router.addRoute("element", "/element/(?<id>.+)", require("./actions/element"));
router.set404Route(require("./actions/not-found"));
