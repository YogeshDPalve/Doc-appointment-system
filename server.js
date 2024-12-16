const express = require("express")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require('./routes/userRoutes')
const bodyParser = require('body-parser');
// dotenv configure
dotenv.config();

// mongodb connection
connectDB();


// rest object
const app = express();
// port
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json());
// routes
app.use('/api/v1/user', userRouter);


// listen port
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white) 
     
})