const centerController = require("../controller/center");
const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/isAuth");

router.post("/add-center", centerController.add_center);
router.get("/get-center", centerController.get_center);
router.get("/get-center/:id", centerController.get_one_center);
router.get("/get-user-center", centerController.get_user_center);
router.get("/center/:title", centerController.search_center);

module.exports = router;
