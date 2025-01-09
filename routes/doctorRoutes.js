const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// Post SINGLE DOCTOR
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

// Post get single doctor info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// GET Appointments
router.get("/doctorAppointments", authMiddleware, doctorAppointmentController);

// POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);
module.exports = router;
