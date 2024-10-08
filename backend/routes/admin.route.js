import express from "express";
import { authenticateUser, authorizeAdmin } from "../middleware/user.auth.js";
import { getAllUsers ,createAdminUser,getAllReports,getUserDetails,updateIssueStatus,getUserDetailsById, createCoupon,deleteCouponById } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/getauser/:id", authenticateUser, authorizeAdmin, getUserDetailsById);
router.get('/allusers', authenticateUser, authorizeAdmin,getAllUsers);
router.get('/allreports', authenticateUser, authorizeAdmin,getAllReports);
router.get('/user-details/:email', authenticateUser, authorizeAdmin,getUserDetails);
router.post('/create-admin', authenticateUser, authorizeAdmin, createAdminUser);
// router.post('/login', adminLogin);
router.patch('/update-report-status/:reportId', authenticateUser, authorizeAdmin, updateIssueStatus);
router.post('/create-coupon', authenticateUser, authorizeAdmin, createCoupon);
router.delete('/delete-coupon/:id', authenticateUser, authorizeAdmin, deleteCouponById);
export default router;
