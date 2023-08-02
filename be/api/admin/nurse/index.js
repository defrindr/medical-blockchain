const express = require("express");
const router = express.Router();

const controller = require("./service");
const { validateStore, validateUpdate } = require("./request");
const validateRequest = require("../../../helpers/validate.request");

router.get(`/`, controller.index);
router.post(`/`, validateStore, validateRequest, controller.store);
router.get(`/:id`, controller.show);
router.put(`/:id`, validateUpdate, validateRequest, controller.update);
router.delete(`/:id`, controller.destroy);

module.exports = router;
