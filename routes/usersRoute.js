const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth= require('../auth/auth');


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

router.put("/user/profile/update",auth.verifyUser, async(req, res) => {
    //console.log(req.customerInfo._id)
    const id = req.userInfo._id;
    const username = req.body.username;
    user.updateOne({_id : id},{username : username}).then(function() {
        res.json({msg: "Update Success!"})


    }).catch(function(e){
        res.json({msg:"Something went wrong!"})

    })
    

})


//customer delete by themselves

router.delete("/user/delete",auth.verifyUser, async(req, res) => {
    const id = req.userInfo._id;
    User.findByIdAndDelete(id).then(function() {
        res.json({msg: "Deleted Successfully!"})

    }).catch(function(e){
        res.json({msg:"Something went wrong!"})
    })
})


//customer delete by different user
// Admin is required

// router.delete("/customer/delete/admin",auth.verifyAdmin, async(req, res) => {
//     const id = req.adminInfo._id;
//     const cid =  req.body.cid   // customer id which is to be deleted
//     customer.deleteOne({_id : cid}).then(function() {
//         res.json({msg: "Deleted Successfully!"})

//     }).catch(function(e){
//         res.json({msg:"Something went wrong!"})
//     })
// })

module.exports = router;

