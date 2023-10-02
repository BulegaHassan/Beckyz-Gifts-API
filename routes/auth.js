const express = require("express");
const router = express.Router();
const { register, login, deleteUsers } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.delete('/', deleteUsers)

module.exports = router;
