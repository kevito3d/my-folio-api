
const Project = require("../models/project.model");

const createProject = async (req, res) => {
  const { name, description, techs } = req.body;

  try {
    let project = new Project(req.body);
    await project.save();

    res.status(200).json({
      ok: true,
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
      error,
    });
  }
};

module.exports = {
  createProject,
};
