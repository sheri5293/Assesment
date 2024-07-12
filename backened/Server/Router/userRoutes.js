const express = require("express");
const { signup, login, getUsers } = require("../controllers/User");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/protectedRoute", verifyToken, (req, res, next) => {
  next();
});
router.get("/users", verifyToken, getUsers);

module.exports = router;
