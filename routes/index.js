//setting up express routes
const express = require("express");
const router = express.Router();

//sub routes
const viewRoutes = require("./view");
const apiRoutes = require('./api');

router.use(viewRoutes);
router.use(apiRoutes);


module.exports = router;