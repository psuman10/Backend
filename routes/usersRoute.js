const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post("/login", async(req, res) => {
    try{
        const { username, password } = req.body
            const user = await Users.findOne({username})
            
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
        const user_name = await Users.findOne({username: newUserName})
        if(user_name) return res.status(400).json({msg: "This user name already exists."})
        const user_email = await Users.findOne({email})
        if(user_email) return res.status(400).json({msg: "This email already exists."})
        if(password.length < 6)
        return res.status(400).json({msg: "Password must be at least 6 characters."})
        const passwordHash = await bcryptjs.hash(password, 12)
        const newUser = new Users({
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

module.exports = router;

