const ObjectModel = require("../models/ObjectModel");
const ObjectModelImg = require("../models/ObjectModelImg");

const createObject = async (req, res) => {
  const { object, image, category, description } = req.body;

  try {
    if (image) {
      const newObjectImg = new ObjectModelImg({
        object,
        image,
      });

      await newObjectImg.save();

      console.log(newObjectImg);

      return res.status(201).json({
        message: "Data with image saved successfully",
      });
    }

    const newObject = new ObjectModel({
      object,
      category,
      description,
    });

    await newObject.save();

    console.log(newObject);

    return res.status(201).json({
      message: "Data saved successfully",
    });
  } catch (err) {
    console.error("Error saving data:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getObjects = async (req, res) => {
  try {
    let objects;

    if (req.query.keyword === "image") {
      objects = await ObjectModelImg.find();
    } else {
      objects = await ObjectModel.find();
    }

    return res.status(200).json(objects);
  } catch (err) {
    console.error("Error fetching data:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  createObject,
  getObjects,
};
