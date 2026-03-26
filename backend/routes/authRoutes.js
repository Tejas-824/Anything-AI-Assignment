const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/errorMiddleware');
const {
  registerValidation,
  loginValidation
} = require('../validations/authValidation');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;