const router = require("express").Router();
const controller = require("./users.controller");

router.route("/").get(controller.list).post(controller.create);
router
  .route("/:username")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.route("/login/:username").get(controller.readLoginCredentials);

module.exports = router;
