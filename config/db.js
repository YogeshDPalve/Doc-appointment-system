const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/doctor-app')
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Error connecting to MongoDB:', err));
        // console.log(process.env.MONGO_URL)
        // await mongoose.connect('mongodb://localhost:27017/doctor-app', { useNewUrlParser: true, useUnifiedTopology: true });
        
        console.log(`mongodb connected ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`mongo connection issue ${error}`.bgRed.white)
    }
}

module.exports = connectDB;
