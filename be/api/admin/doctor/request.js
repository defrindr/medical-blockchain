const { body } = require("express-validator");

const validateStore = [
  body("name").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("email").isEmail().withMessage("Email tidak boleh kosong"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password setidaknya harus mempunyai panjang 6 karakter"),
  body("blockchainAddress")
    .notEmpty()
    .withMessage("Address blockchain tidak boleh kosong"),
];

const validateUpdate = [];

module.exports = {
  validateStore,
  validateUpdate,
};
