const express = require("express");
const router = express.Router();

const {
  register,
  login,
  deleteUsers,
  getAdmins,
} = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/", getAdmins);
router.delete("/", deleteUsers);

module.exports = router;
