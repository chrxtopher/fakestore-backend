const router = require("express").Router();
const controller = require("./users.controller");

router.route("/").get(controller.list).post(controller.create);
router.route("/:username").get(controller.read).delete(controller.delete);

module.exports = router;
