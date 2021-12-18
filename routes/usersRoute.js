const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/login", async(req, res) => {
    const username = req.body.username;
    User.findOne({username: username}).then(function(userData){
        // console.log(customerData);
        if(userData==null){
            return res.json({message: "Invalid"})
            
        }

        //compairing password

        const password = req.body.password;
        bcryptjs.compare(password, userData.password, function(e,result){

            if(result==false){
                return res.json({message: "invalid"})
            
            }

            // TOKEN

            const token = jwt.sign({cid: userData._id}, "aysecretkey");
            res.json({token: token});

        })

    })
    
    })
    

router.post("/register", async(req, res) => {
    const username = req.body.username;
    User.findOne({username: username}).then(function(data){
        if(data!=null){
            res.json({msg:"Username already exists", success:false})
            return;

        }
        const password = req.body.password;
        bcryptjs.hash(password, 10, function(e,hashed_pw){
            const user =  User({
                username : username,
                password : hashed_pw,
                
            })

            user.save().then(function(){
                res.json({msg: "Registered Successful"});

            })
            .catch(function(e) {
                res.json(e)
            })
        })

    })
    

});
    
module.exports = router

