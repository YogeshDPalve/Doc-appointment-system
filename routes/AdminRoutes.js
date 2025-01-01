const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
} = require("../controllers/adminCtrl");

// GET MOTHOD || USERS
router.get("getAllUsers", authMiddleware, getAllUsersController);

// GET MOTHOD || DOCTORS
router.get("getAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = router;
