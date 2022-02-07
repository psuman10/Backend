// use the path of your model
const User = require("../../models/userModel");
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
describe("User Schema test anything", () => {
  // the code below is for delete testing
  it("to test the delete User is working or not", async () => {
    const status = await User.deleteOne();
    expect(status.ok);
  });
});
