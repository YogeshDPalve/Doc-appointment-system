const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
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

// export
module.exports = router;
