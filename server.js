const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes.js");
const doctorRouter = require("./routes/doctorRoutes.js");
const bodyParser = require("body-parser");
const cors = require("cors");

// dotenv configure
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();
// port
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
// routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRouter);

// global catch
app.use((err, req, res, next) => {
  res.send({
    message: "Oops...Sorry Something is Up With Our Server....!",
    success: false,
    error: err,
  });
  console.log(err);
});

// listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan
      .white
  );
});
