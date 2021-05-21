var express = require("express");
var router = express.Router();

const formRoute = require("./formRoute");

router.use("/form", formRoute);

module.exports = router;
