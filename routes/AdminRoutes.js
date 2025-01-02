const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

// GET MOTHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET MOTHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
