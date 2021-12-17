const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect("mongodb://localhost:27017/yourscar_rental" , {
        useUnifiedTopology: true , 
        useNewUrlParser: true
})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Connection Error')
    })

}

connectDB()

module.exports = mongoose