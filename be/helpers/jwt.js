const jwt = require("jsonwebtoken");
const config = require("../config");

function validateJwtToken(token) {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log(decoded)

    // The token is valid
    return { valid: true, decoded };
  } catch (err) {
    console.log(err.message)
    // An error occurred while verifying the token
    return { valid: false, error: err.message };
  }
}

function signJwtToken(data) {
  console.log(config.jwtSecret);
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: "1h", // Set token expiration time
  });
}

module.exports = {
  validateJwtToken,
  signJwtToken,
};
