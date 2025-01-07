const userModel = require("../models/userModels");
const appoointmentModel = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

// Register controller
const registerController = async (req, res) => {
  // console.log("In Register controller".bgWhite.white);
  try {
    // Check if the user already exists
    var password = req.body.password;
    const email = req.body.email;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: "User Already Exists",
        success: false,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the request body with the hashed password
    // password = hashedPassword;

    // Create and save the new user
    const newUser = new userModel({
      ...req.body, // Copy other fields from req.body
      password: hashedPassword, // Override password with hashed password
    });
    await newUser.save();

    // Respond with success
    res.status(201).send({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: `Register controller error: ${error.message}`,
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  // Login logic here
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(200).send({
        message: "Invalid Email or Password  ",
        success: false,
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "Login Successful",
        success: true,
        token,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Error in login CTRLR ${error.message}`,
    });
  }
};

// Auth controller
const authController = async (req, res) => {
  try {
    // console.log("In Auth Controller".bgGreen.white)

    const user = await userModel.findOne({ _id: req.body.userId }); // userId is coming from authMiddleware
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Auth failed | Internal server Error",
      success: false,
      error,
    });
  }
};

// Apply doctor controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new doctorModel({
      ...req.body, // Copy other fields from req.body
      status: "pending", // Override status with pending
    });
    await newDoctor.save();

    const adminUser = await userModel.findOne({ isAdmin: true });
    // console.log("adminuser:".bgRed.white, adminUser);
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    // console.log("notification: ".bgRed.white ,notification);
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      message: "Doctor Application Submitted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: `Apply Doctor Controller Error ${error.message}`,
      success: false,
      error,
    });
  }
};

// notification controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // console.log(user.notification);
    // Append notifications to seenNotification
    user.seenNotification.push(...user.notification);

    // Clear the current notifications
    user.notification = [];

    // Save the updated user
    const updatedUser = await user.save();

    // Send success response
    res.status(200).send({
      message: "All notifications marked as read",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    // Handle errors
    res.status(500).send({
      message: "Error in marking notifications as read",
      success: false,
      error,
    });
  }
};

// delete all notification controller
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications deleted successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notification",
      error,
    });
  }
};

// get all doc controller
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "All doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "Unable to get all doctors error from get-all-doctors-controller",
      error,
    });
  }
};

// book appointment controller
const bookeAppointmnetController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYY").toISOString();
    req.body.time == moment(req.body.time, "HH:mm").toISOString();

    req.body.status = "pending";

    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });

    user.notification.push({
      type: "New-appointment-request",
      message: `A New Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Apointment",
    });
  }
};

// booking availability controller

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Appointments not Available at this time",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      meesage: "Error while booking availability",
      error,
    });
  }
};

// appointments lists
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });

    res.status(200).send({
      success: true,
      message: "Users Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Gtting User Appointments",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
};
