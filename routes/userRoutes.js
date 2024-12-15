const express = require('express');
const { loginController, registerController } = require('../controllers/userCtrl');

// router object
const router = express.Router();

// routes

// LOGIN || post
router.post('/login', loginController);
// REGISTER || post
router.post('/register', registerController);
