const Project = require("../models/project.model");

const createProject = async (req, res) => {
  const { name, description, techs } = req.body;

  try {
    let project = new Project({ name, description, techs });
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

// put project

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, techs } = req.body;

  try {
    let project_updated = await Project.findByIdAndUpdate(
      id,
      { name, description, techs },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      project_updated,
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

//delete project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    let project_deleted = await Project.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      project_deleted,
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

//get project
const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    let project = await Project.findById(id);

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
  updateProject,
  deleteProject,
  getProject,
};
