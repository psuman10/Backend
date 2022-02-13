// use the path of your model
const Car = require("../../models/carModel")
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/carrental_test";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("Car Schema test anything", () => {
  it("to test the update", async () => {
    return Car.findOneAndUpdate(
      { _id: Object("62087a2643a48f56b3001caf") },
      { $set: { name: "kia" } }
    ).then((result) => {
      expect(result.name).toEqual("creta");
    });
  });
});
