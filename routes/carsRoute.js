const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");


router.post("/addcar", async (req, res) => {
    try {

      const {image,rentPerHour,capacity,name}=req.body
      const car = new Car({
        name,
        image,
        capacity,
        fuelType,
        rentPerHour,
      })
      await car.save();
     
      res.send("Car added successfully"); 
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router.get("/getallcars", async (req, res) => {
    try {
      const cars = await Car.find();
      res.json({success:true,cars:cars});
    } catch (error) {
      return res.status(400).json({error:error,success:false});
    }
  });
  router.get("/getcar/:carid", async (req, res) => {
    try {
      const carid=req.params.carid;
      const car = await Car.findOne({_id:carid});
      res.json({success:true,car:car});
    } catch (error) {
      return res.status(400).json({error:error,success:false});
    }
  });

  router.put("/editcar", async (req, res) => {
    try {
      const car = await Car.findOne({ _id: req.body._id });
      car.name = req.body.name;
      car.image = req.body.image;
      car.fuelType = req.body.fuelType;
      car.rentPerHour = req.body.rentPerHour;
      car.capacity = req.body.capacity;
  
      await car.save();
  
      res.send("Car details updated successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.delete("/deletecar/:carid", async (req, res) => {
    try {
      await Car.findOneAndDelete({ _id: req.params.carid });
  
      res.send("Car deleted successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  
  module.exports = router;