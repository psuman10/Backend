// use the path of your model
const User = require("../../models/userModel")
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
describe("Testing user Login", () => {
  // the code below is for insert testing
  it("Login ", () => {
    const login = {
      username: "sumanparajuli78",
      password:"suman@123",
      
    };
    return User.findOne(login).then((result) => {
      expect(result.username).toEqual("sumanparajuli78");
    });
  });

});
