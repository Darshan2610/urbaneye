import express from 'express';
import { userRegister, userLogin, forgotPassword, verifyOTP, resetPassword } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

export default router;
