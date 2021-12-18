const express  = require("express")
const app = express();

const port = process.env.PORT || 5000


app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./database/db")

// const usersRoute = require("./routes/usersRoute");
// app.use(usersRoute);

app.use('/api/users/' , require('./routes/usersRoute'))


// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))
