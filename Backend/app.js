const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// Schema
const objectScheme = new mongoose.Schema({
  object: {
    type: String,
    // required: [true, "Please add an object name/title"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  category: {
    type: String,
    // required: [true, "Please add the category of the object"],
  },
  description: {
    type: String,
    // required: [true, "Please add a description about the object"],
  },
});

const ObjectModel = mongoose.model("Object", objectScheme);

// POST route for creating an object
app.post("/player1", async (req, res) => {
  try {
    const { object, category, description } = req.body;
    const newObject = new ObjectModel({
      object,
      category,
      description,
    });
    await newObject.save();
    console.log(newObject);
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
