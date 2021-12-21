const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth= require('../auth/auth');



router.post("/login", async(req, res) => {
    try{
        const { username, password } = req.body
            const user = await User.findOne({username})
            
            if(!user) return res.status(400).json({msg: "This username does not exist."})
            const isMatch = await bcryptjs.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            res.json({
                msg: 'Login Success!',
                
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    })
    

router.post("/register", async(req, res) => {
    try {
        const { username, email, password  } = req.body
        let newUserName = username.toLowerCase().replace(/ /g, '')
        const user_name = await User.findOne({username: newUserName})
        if(user_name) return res.status(400).json({msg: "This user name already exists."})
        const user_email = await User.findOne({email})
        if(user_email) return res.status(400).json({msg: "This email already exists."})
        if(password.length < 6)
        return res.status(400).json({msg: "Password must be at least 6 characters."})
        const passwordHash = await bcryptjs.hash(password, 12)
        const newUser = new User({
            username: newUserName, email, password: passwordHash
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
    //console.log(req.customerInfo._id)
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




module.exports = router;

