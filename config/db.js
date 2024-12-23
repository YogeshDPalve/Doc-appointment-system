const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() =>
        console.log("------***Connected to MongoDB***------".bgGreen.white)
      )
      .catch((err) => console.error("Error connecting to MongoDB:", err));
  } catch (error) {
    console.log(`mongo connection issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
