const SocialNetwork = require("../models/socialNetwork.model");

const createSn = async (req, res) => {
  const { name, url } = req.body;

  try {
    let ns = new SocialNetwork({ name, url });
    await ns.save();

    res.status(200).json({
      ok: true,
      social_network: ns,
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

const updateSn = async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;

  try {
    let sn_updated = await SocialNetwork.findByIdAndUpdate(
      id,
      { name, url },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      sn_updated,
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
const deleteSN = async (req, res) => {
  const { id } = req.params;

  try {
    let sn_deleted = await SocialNetwork.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      sn_deleted: sn_deleted,
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
const getSn = async (req, res) => {
  const { id } = req.params;

  try {
    let sn = await SocialNetwork.findById(id);

    res.status(200).json({
      ok: true,
      social_network: sn,
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
  createSn,
  updateSn,
  deleteSN,
  getSn,
};
