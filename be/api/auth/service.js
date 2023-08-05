// controllers/authController.js

// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Pasien } = require("../../models");
const { signJwtToken } = require("../../helpers/jwt");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user in the database by their email
    const user = await User.findOne({
      where: { email },
      include: ["roles"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    // If the password is valid, generate a JWT token and send it back as a response
    let roles = user.roles.map((role) => role.name);

    let userData = {
      id: user.id,
      email: user.email,
      roles,
      blockchainAddress: user.blockchainAddress,
    };

    // assign nik if roles include patient
    if (roles.includes("patient")) {
      let patient = await Pasien.findOne({ where: { userId: user.id } });
      console.log(patient)
      userData["nik"] = patient.noIdentity;
    }
    console.log(userData)
    const token = signJwtToken(userData);

    res.json({ status: true, token, refreshToken: "" });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ status: false, message: "An error occurred during login" });
  }
}

module.exports = {
  login,
};
