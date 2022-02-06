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
describe("Testing user Register", () => {
  // the code below is for insert testing
  it("Register ", () => {
    const register = {
      username: "sumanparajuli789",
      email: "suman123@gmail.com",
      gender:"male",
      password:"suman@123",
      address:"tikathali"
    };

    return User.create(register).then((result) => {
      expect(result.username).toEqual("sumanparajuli789");
    });
  });

});
