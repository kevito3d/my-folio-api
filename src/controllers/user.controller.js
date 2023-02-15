const User = require("../models/user.model");
const Project = require("../models/project.model");
const SocialNetwork = require("../models/socialNetwork.model");

const updateInfo = async (req, res) => {
  const { uid } = req.params;
  const {
    title_name,
    description,
    info_email,
    info_phone,
    socials_id,
    projects_id,
  } = req.body;

  try {
    //retorna el usuario con datos completos de redes sociales y proyectos
    User.findByIdAndUpdate(
      uid,
      {
        title_name,
        description,
        info_email,
        info_phone,
        socials_id,
        projects_id,
      },
      { new: true }
    )
      .populate("socials_id", "name url")
      .populate("projects_id", "name description")
      .exec(async (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            ok: false,
            msg: "Please contact the administrator",
            err,
          });
        } else {
          console.log(user);
          //   find all projects in db

          res.status(200).json({
            ok: true,
            user,
          });
        }
      });
  } catch (error) {}
};

module.exports = {
  updateInfo,
};
