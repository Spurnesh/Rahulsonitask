var express = require("express");
var router = express.Router();

const formController = require("../controllers/formController");

router.route("/").post(formController.createData);

module.exports = router;
