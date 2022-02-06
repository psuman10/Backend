const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

module.exports.verifyUser = function(req,res,next) {
    try{
        token = req.headers.authorization.split(" ")[1];
       const data= jwt.verify(token,"aysecretkey");
        user.findOne({_id : data.cid}).then(function(result){
            req.userInfo = result;
            next();
        })
        .catch(function(error){
            res.json({msg:"Invalid user!!"})
            
        })
    }
    catch(error){
        
        res.json({msg:"Invalid Token!!"});
    }
    
}