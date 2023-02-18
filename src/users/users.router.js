const router = require("express").Router();
const controller = require("./users.controller");

router.route("/").get(controller.list);
router.route("/:username").get(controller.read);

module.exports = router;
