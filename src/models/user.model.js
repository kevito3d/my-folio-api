const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  user: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  title_name: {
    type: String,
  },

  description: {
    type: String,
  },

  info_email: {
    type: String,
  },

  info_phone: {
    type: String,
  },

  socials_id: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialsNetwork",
      },
    ],
    // permite null
  },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, password, socials_id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("User", UserSchema);
