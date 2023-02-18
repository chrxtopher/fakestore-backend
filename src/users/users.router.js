const router = require("express").Router();
const controller = require("./users.controller");

router.route("/").get(controller.list);
router.route("/signup").post(controller.create);
router.route("/:username").get(controller.read);

module.exports = router;
