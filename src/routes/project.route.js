const { Router } = require("express");
const { check } = require("express-validator");
const { createProject } = require("../controllers/project.controller");
const validate = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("techs", "Techs is required").isArray(),
    validate()
], validateJWT, createProject);

module.exports = router;