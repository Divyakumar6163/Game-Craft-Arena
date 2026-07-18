const express = require("express");

const router = express.Router();

const {
  createObject,
  getObjects,
} = require("../controllers/guessTheObjectController");

router.post("/player1", createObject);

router.get("/player2", getObjects);

module.exports = router;
