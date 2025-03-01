const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

// routes

// LOGIN || post
router.post("/login", loginController);

// REGISTER || post
router.post("/register", registerController);

// Auth || post
router.post("/getUserData", authMiddleware, authController);

// Apply doctor || post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// notification doctor || post
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// notification doctor || post
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// GEt all doc || get
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// book appointments
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// booking availability
router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

// Appointment lists
router.get("/user-appointments", authMiddleware, userAppointmentsController);
// export
module.exports = router;
