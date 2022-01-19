const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});




module.exports = router;
