const mongoose = require("mongoose");
function connectDB(){

mongoose.connect('mongodb://127.0.0.1:27017/yours_choice_rental',{
    useNewUrlParser:true,
    useUnifiedTopology : true
})

const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })

}
connectDB()
module.exports = mongoose