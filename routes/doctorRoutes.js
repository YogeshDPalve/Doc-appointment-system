const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController } = require('../controllers/doctorCtrl');

const router = express.Router();

// Post SINGLE DOCTOR
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

module.exports = router;