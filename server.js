const express  = require("express")
const app = express();
const cors=require("cors");
const port = process.env.PORT || 4000
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
;
require("./database/db")

app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/cars/' , require('./routes/carsRoute'))  
app.use('/api/bookings/' , require('./routes/bookingsRoute'))


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))
