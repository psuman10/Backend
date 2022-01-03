const express  = require("express")
const app = express();

const port = process.env.PORT || 8000


app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./database/db")


app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/cars/' , require('./routes/carsRoute'))


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))
