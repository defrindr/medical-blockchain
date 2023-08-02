// middlewares/auth.js

const { validateJwtToken } = require("../helpers/jwt");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  token = token.replace("Bearer", "").trim();
  let response = validateJwtToken(token);

  if (!response.valid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = response.decoded;
  next();
}

module.exports = verifyToken;
