const express = require('express');
const { loginController, registerController } = require('../controllers/userCtrl');

// router object
const router = express.Router();

// routes
// console.log("In User router");

// LOGIN || post
router.post('/login', loginController);
// console.log("login pass")


// REGISTER || post
router.post('/register', registerController);
// console.log("register pass")

module.exports = router;