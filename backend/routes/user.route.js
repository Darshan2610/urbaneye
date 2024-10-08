import express from 'express';
import { userRegister, userLogin, forgotPassword, verifyOTP, resetPassword, getMyDetails } from '../controllers/user.controller.js';
import { authenticateUser } from "../middleware/user.auth.js";


const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

router.get("/me", authenticateUser, getMyDetails); // Endpoint to get user details

export default router;
