const mongoose = require("mongoose");

const objectSchemaImg = new mongoose.Schema(
  {
    object: {
      type: String,
      required: [true, "Please add an object name/title"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    image: {
      type: String,
      required: [true, "Please add the Base64 image data"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ObjectImg", objectSchemaImg);
