const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  const { user, password } = req.body;

  try {
    let user;
    user = await ifExist(user, user)
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = await generateJWT(user.id);

    res.status(200).json({
      ok: true,
      user,
      token,
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

const ifExist = async (user, email) => {


  const userExist = await User.findOne({
    $or: [{  user }, { email }],
  });
  console.log(userExist)
  return userExist;
};

const loginUser = async (req, res) => {
  const { user, password } = req.body;
  console.log(user, password)
  try {
    // find one user by email
    let userExist =await  ifExist(user, user);


    if (!userExist) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password is not valid",
      });
    }
    const token = await generateJWT(userExist.id);
    res.status(200).json({
      ok: true,
      user: userExist,
      token,
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

const renewToken = async (req, res) => {
  const uid = req.uid;
  console.log(uid)
  const token = await generateJWT(uid);
  const user = await User.findById(uid, "user email role", { new: true, 
    populate: [
      {
        path: "socials_id",
        select: "name url",
      },
      {
        path: "projects_id",
        select: "name description",
      },
    ],
   }, )
  res.status(200).json({
    ok: true,
    user,
    token,
  });
};


module.exports = {
  createUser,
  loginUser,
  renewToken,
  ifExist
};
