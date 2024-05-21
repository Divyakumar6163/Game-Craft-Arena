const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase the limit to handle large Base64 data
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
// Schema
const objectSchema = new mongoose.Schema({
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
});

const ObjectModel = mongoose.model("Object", objectSchema);

const objectSchemaImg = new mongoose.Schema({
  object: {
    type: String,
    required: [true, "Please add an object name/title"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  image: {
    type: String, // To store Base64 encoded string
    required: [true, "Please add the Base64 image data"],
  },
});

const ObjectModelImg = mongoose.model("ObjectImg", objectSchemaImg);

// POST route for creating an object with Base64 image
app.post("/player1", async (req, res) => {
  const { object, image, category, description } = req.body;
  try {
    if (image) {
      const newObjectImg = new ObjectModelImg({
        object,
        image,
      });
      await newObjectImg.save();
      console.log(newObjectImg);
      res.status(201).json({ message: "Data with image saved successfully" });
    } else {
      const newObject = new ObjectModel({
        object,
        category,
        description,
      });
      await newObject.save();
      console.log(newObject);
      res.status(201).json({ message: "Data saved successfully" });
    }
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/player2", async (req, res) => {
  try {
    let objects;
    // const keyword = { keyword: "image" };
    if (req.query.keyword === "image") {
      objects = await ObjectModelImg.find();
    } else {
      objects = await ObjectModel.find();
    }
    // console.log(req.query);
    res.status(200).json(objects);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = app;
