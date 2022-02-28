const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username : {type:String , required: true, unique: true},
     email : {type:String, required : true},
     gender : {
          type:String, required: true, default:"Male"
     }, 
     password : {type:String , required: true},
     address : {type:String },
     role: {type:Number, default:0},
     
})

const userModel = mongoose.model('users' , userSchema)

module.exports = userModel