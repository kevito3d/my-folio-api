const jwt = require("jsonwebtoken");
const { ifExist } = require("../controllers/auth.controller");
const userModel = require("../models/user.model");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Could not generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJWT =async (token = "") => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(uid);
        if (!user) {
            return [false, null];
        }
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
};

module.exports = {
    generateJWT,
    checkJWT
};
