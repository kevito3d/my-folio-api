const { Schema, model } = require("mongoose");

const SocialNetworkSchema = Schema({
  
  name : {
    type: String,
    required: true,
  },

  url : {
    type: String,
    required: true,
  },

});

SocialNetworkSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});


module.exports = model("SocialNetwork", SocialNetworkSchema);
