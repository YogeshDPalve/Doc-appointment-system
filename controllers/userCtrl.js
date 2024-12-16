const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');

// console.log("In Controller ".bgWhite.white);

const registerController = async (req, res) => {
    // console.log("In Register controller".bgWhite.white);
    // try {
    //     // Check if the user already exists
    //     const existingUser = await userModel.findOne({ email: req.body.email });
    //     if (existingUser) {
    //         return res.status(200).send({
    //             message: 'User Already Exists',
    //             success: false
    //         });
    //     }

    //     // Hash the password
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     // Update the request body with the hashed password
    //     const password = req.body.password;
    //     password = hashedPassword;

    //     // Create and save the new user
    //     const newUser = new userModel(req.body); // Use `new` keyword to create a model instance
    //     await newUser.save();

    //     // Respond with success
    //     res.status(201).send({
    //         message: "User Created Successfully",
    //         success: true
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send({
    //         success: false,
    //         message: `Register controller error: ${error.message}`
    //     });
    // }
};

const loginController = () => {
    // Login logic here
};

module.exports = { loginController, registerController };
