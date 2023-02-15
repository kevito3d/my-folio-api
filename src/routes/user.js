const { Router } = require("express");
const { check } = require("express-validator");
const { updateInfo } = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.put("/:uid",[
    check("title_name", "The title name is required").not().isEmpty(),
    check("description", "The description is required").not().isEmpty(),
    check("info_email", "The email is required").not().isEmpty(),
    check("info_phone", "The phone is required").not().isEmpty(),
    // check("socials_id", "The socials id is required").not().isEmpty(),
    check("projects_id", "The projects id is required").not().isEmpty(),
    validate()
], validateJWT,  updateInfo);

module.exports = router;
