const express = require("express");
const { createUser, loginUser, checkAuth } = require("../controller/auth");
const passport = require("passport");
const router = express.Router();

// /auth is already added in base path
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth);

module.exports = router;
