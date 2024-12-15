const express = require("express")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv")

// dotenv configure
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'server running'
    })
})

// port
const port = process.env.PORT || 3000;

// listen port
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white) 
     
})