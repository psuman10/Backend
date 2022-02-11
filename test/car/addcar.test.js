// use the path of your model
const Car = require("../../models/carModel")
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
describe("Testing Adding Car", () => {
  // the code below is for insert testing
  it("Add Car ", () => {
    const addcar = {
      name: "ferrari",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Red_2019_Ferrari_SF90_Stradale_%2848264238897%29_%28cropped%29.jpg",
      capacity:"2",
      fuelType: "petrol",
      rentPerHour: "200",
      
    };

    return Car.create(addcar).then((result) => {
      expect(result.name).toEqual("ferrari");
    });
  });

});
