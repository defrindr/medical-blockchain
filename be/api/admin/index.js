const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("-- middleware admin --");
  // if (req.user.roles.includes("admin")) {
    return next();
  // }

  // return res
  //   .status(403)
  //   .json({ message: "Only Admin can access this endpoint" });
});

router.use("/profile", require("./profile"));
router.use("/doctor", require("./doctor"));
router.use("/nurse", require("./nurse"));
router.use("/patient", require("./patient"));
router.use("/user", require("./user"));

module.exports = router;
