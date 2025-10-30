const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const uploadController = require("../controllers/uploadController");

router.post("/single", auth, upload.single("file"), uploadController.single);

router.post("/multiple", auth, upload.array("files", 5), uploadController.multiple);

module.exports = router;
