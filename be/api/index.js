const express = require("express");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/admin", verifyToken , require("./admin"));

module.exports = router;
