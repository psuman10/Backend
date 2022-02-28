const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
// const auth = require("../auth/auth");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    if (!user)
      return res.status(400).json({ msg: "This username does not.. exist." });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password didn't match." });
    if (user) {
      return res.send({
          success: true,
          user:user
        
      });

      return res.status(200).json({ user:user });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}); 

router.post("/register", async (req, res) => {
  try {
    const { username, email, gender, password } = req.body;
    let newUserName = username.toLowerCase().replace(/ /g, "");
    const user_name = await User.findOne({ username: newUserName });
    if (user_name)
      return res.status(400).json({ msg: "This username already exists." });
    const user_email = await User.findOne({ email });
    if (user_email)
      return res.status(400).json({ msg: "This email already exists." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });
    const passwordHash = await bcryptjs.hash(password, 12);
    const newUser = new User({
      username: newUserName,
      email,
      gender,
      password: passwordHash,
    });

    await newUser.save();
    res.json({
      msg: "Register Success!",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json(error);
  }
});


router.get("/getallusers/:id", async (req, res) => {
  try {
    const id=req.params.id;
    const users = await User.findOne({_id:id});
    res.json({success:true,user:users});
  } catch (error) {
    return res.status(400).json({error:error, success:false});
  }
});

router.put("/editusers/:id", async (req, res) => {
  try {
    const id = req.params.id;

  const username = req.body.username;
    const email = req.body.email;
    const gender = req.body.gender;
const address = req.body.address;
 
const result=await User.updateOne({_id:id},{
  username:username,
  email:email,
  address:address,
  gender:gender
})
if(result){
  res.send({msg:"update successfully"})
}
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;



router.delete("/deleteusers/:userid", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.userid });
    

    res.send("user has been deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;