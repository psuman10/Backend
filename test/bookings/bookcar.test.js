// use the path of your model
const Booking = require("../../models/bookingModel")
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/carrental_test";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology : true
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("Testing Booking Car", () => {
  // the code below is for insert tes
  it("Book Car ", () => {
    const bookcar = {
      car:Object("62087a2643a48f56b3001caf"),
      totalhours:"48",
      totalAmount:"38400",
      transactionId:"card_1KQYgvH1DycL4QJ3NeuV9Sns"
      
    };

    return Booking.create(bookcar).then((result) => {
      expect(result.totalAmount).toEqual(38400);
    });
  });

});
