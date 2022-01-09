const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const multerStorage = require("../../../services/util/multerStorage");
const multer = require("multer");
const upload = multer({storage: multerStorage});

router.get("/dashboard", controller.dashboard);

module.exports = router;
