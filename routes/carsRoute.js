const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");


router.post("/addcar", async (req, res) => {
    try {
      const newcar = new Car(req.body);
      await newcar.save();
      res.send("Car added successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });