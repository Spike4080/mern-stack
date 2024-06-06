const express = require("express");
const UsersController = require("../controllers/UsersController");
const handleErrorMessage = require("../middlewares/handleErrorMessange");
const { body } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.post("/login", UsersController.login);

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("User with this email already exitsts");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  UsersController.register
);

module.exports = router;
