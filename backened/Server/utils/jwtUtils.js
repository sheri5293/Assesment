const jwt = require("jsonwebtoken");
const { SECRET_KEY, TOKEN_EXPIRATION } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
}

module.exports = { generateToken };
