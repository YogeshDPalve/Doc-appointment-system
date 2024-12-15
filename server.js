const express = require("express")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require('./routes/userRoutes')

// dotenv configure
dotenv.config();

// mongodb connection
connectDB();


// rest object
const app = express();

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/user', userRouter);

// port
const port = process.env.PORT || 3000;

// listen port
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white) 
     
})