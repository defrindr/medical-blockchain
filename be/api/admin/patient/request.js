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

  body("noIdentity").notEmpty().withMessage("NIK tidak boleh kosong"),
  body("address").notEmpty().withMessage("Alamat tidak boleh kosong"),
  body("gender").notEmpty().withMessage("Jenis Kelamin tidak boleh kosong"),
  body("bloodType").notEmpty().withMessage("Golongan Darah tidak boleh kosong"),
  body("birthday").notEmpty().withMessage("Tanggal lahir tidak boleh kosong"),
];

const validateUpdate = [];

module.exports = {
  validateStore,
  validateUpdate,
};
