const { Schema, model } = require("mongoose");

const SocialsNetwork = Schema({
  
  name : {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  techs: {
    type: [String],
    required: true,
  },

});

SocialsNetwork.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("SocialsNetwork", SocialsNetwork);
