const User = require("../models/user.model");

const updateInfo = async (req, res) => {
  const { uid } = req.params;
  const { title_name, description, info_email, info_phone, socials_id } =
    req.body;


  try {
    const user_updated =await  User.findByIdAndUpdate(
      uid,
      { title_name, description, info_email, info_phone, socials_id },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      user_updated,
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
  updateInfo,
};
