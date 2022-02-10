// use the path of your model
const Booking = require("../../models/bookingModel");
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
describe("Booking Schema test anything", () => {
  // the code below is for delete testing
  it("to test the delete Booking is working or not", async () => {
    const status = await Booking.deleteOne();
    expect(status.ok);
  });
});
