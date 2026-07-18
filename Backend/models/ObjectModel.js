const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: [true, "Please add an object name/title"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    category: {
      type: String,
      required: [true, "Please add the category of the object"],
    },
    description: {
      type: String,
      required: [true, "Please add a description about the object"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Object", objectSchema);
