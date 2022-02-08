// use the path of your model
const User = require("../../models/userModel")
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
describe("User Schema test anything", () => {
  it("to test the update", async () => {
    return User.findOneAndUpdate(
      { _id: Object("6208757fdfedb8f0e1e55072") },
      { $set: { username: "sumanman" } }
    ).then((result) => {
      expect(result.username).toEqual("suman");
    });
  });
});
