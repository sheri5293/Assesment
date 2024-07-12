const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

function verifyToken(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
