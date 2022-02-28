const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({


      car : {type : mongoose.Schema.Types.ObjectID , ref:'cars'},
      user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
      start:{type: String},
      end:{type: String},
      totalHours : {type : String},
      totalAmount : {type : String},
     transactionId : {type:String, default: "RENTAL"+Math.floor(Math.random() *100000000000000000).toString()},
      driverRequired : {type : Boolean, default : false},
},
  {timestamps : true} 
) 

const bookingModel = mongoose.model('bookings' , bookingSchema)

module.exports = bookingModel 