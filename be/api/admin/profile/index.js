const express = require("express");
const router = express.Router();

const service = require("./service");
router.get(`/`, service.index);
router.post(`/`, service.update);

module.exports = router;
