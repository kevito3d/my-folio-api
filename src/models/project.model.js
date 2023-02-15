const { Schema, model } = require("mongoose");

const ProjectSchema = Schema({
  
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

ProjectSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Project", ProjectSchema,);
