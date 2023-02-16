const { Router } = require("express");
const { check } = require("express-validator");
const { createProject, updateProject, deleteProject, getProject } = require("../controllers/project.controller");
const validate = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("techs", "Techs is required").isArray(),
    validate()
], validateJWT, createProject);

// put, delete, get

router.put("/:id", [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("techs", "Techs is required").isArray(),
    validate()
], validateJWT, updateProject);

router.delete("/:id", validateJWT, deleteProject);

router.get("/:id", validateJWT, getProject);

module.exports = router;