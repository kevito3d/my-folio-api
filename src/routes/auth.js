const { Router } = require("express");
const { check } = require("express-validator");

const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/register",
  [
    check("user", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail() ,
    check("password", "Password is required").not().isEmpty(),
    validate(),
  ],
  createUser
);

router.post(
  "/login",
  [
    // user o email requerido
    check("user", "User is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validate(),
  ],
  loginUser
);

router.get("/renewToken", validateJWT, renewToken);

module.exports = router;
