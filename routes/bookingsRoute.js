const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KODU8H1DycL4QJ3HKQFtcTDEFboaMSnNaadXMpzZkeqof9ctyfaJvnE9igjjRWKUVOjjsKZVFp3ZdzEKTPKMDBy00t3AuAZix"
);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "AUD",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send({bookings:bookings});
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/bookingcar", async (req, res) => {
  try {
    const { start, end, totalHours, totalAmount, user, car } = req.body;

    const newbooking = new Booking({
      car,
      user,
      start,
      end,
      totalHours,
      totalAmount,
    });
    const result = await newbooking.save();
    if (result) {
      res.send("Booking is successfull");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/cancelBooking", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.bookingid });

    res.send("Your booking has been cancelled successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
