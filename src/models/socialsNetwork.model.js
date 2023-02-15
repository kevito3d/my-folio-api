const { Schema, model } = require("mongoose");

const SocialsNetworkSchema = Schema({
  
  name : {
    type: String,
    required: true,
  },

  url : {
    type: String,
    required: true,
  },

});

SocialsNetworkSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("SocialsNetwork", SocialsNetworkSchema);
