const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs= require("bcryptjs");
// const jwt = require("jsonwebtoken");
const auth= require('../auth/auth');



router.post("/login", async(req, res) => {
    try{
        const { username, password } = req.body
            const user = await User.findOne({username})
            
            if(!user) return res.status(400).json({msg: "This username does not exist."})
            const isMatch = await bcryptjs.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password didn't match."})
            res.json({
                msg: 'Login Success!',
                
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    })
    

router.post("/register", async(req, res) => {
    try {
        const { username, email, gender,password  } = req.body
        let newUserName = username.toLowerCase().replace(/ /g, '')
        const user_name = await User.findOne({username: newUserName})
        if(user_name) return res.status(400).json({msg: "This username already exists."})
        const user_email = await User.findOne({email})
        if(user_email) return res.status(400).json({msg: "This email already exists."})
        if(password.length < 6)
        return res.status(400).json({msg: "Password must be at least 6 characters."})
        const passwordHash = await bcryptjs.hash(password, 12)
        const newUser = new User({
            username: newUserName, email, gender,password: passwordHash
        })
        
        await newUser.save()
        res.json({
            msg: 'Register Success!',
            
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

router.put("/userprofile/update",auth.verifyUser, async(req, res) => {
    
    const id = req.userInfo._id;
    const email = req.body.email;
    user.updateOne({_id : id},{email : email}).then(function() {
        res.json({msg: "Update Success!"})


    }).catch(function(e){
        res.json({msg:"Something went wrong!"})

    })
    

})

router.delete("/delete",auth.verifyUser, async(req, res) => {
    const id = req.userInfo._id;
    user.findByIdAndDelete(id).then(function() {
        res.json({msg: "Deleted Successfully!"})

    }).catch(function(e){
        res.json({msg:"Something went wrong!"})
    })
})


router.delete("/test",function(req,res){
    res.json({msg:"/deleted"})
})


router.put("/test2",function(req,res){
    res.json({msg:"/deleted"})
})

router.get("/getallusers", async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router.post("/editprofile", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body._id });
      user.username = req.body.username;
      user.address = req.body.address;
      user.email = req.body.email;
      user.gender = req.body.gender;

  
      await user.save();
  
      res.send("user details updated successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;