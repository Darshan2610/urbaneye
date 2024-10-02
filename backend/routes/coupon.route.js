import express from "express";
import {
  getAllCoupons,
  redeemCoupon,
  getUserCoupons,
} from "../controllers/coupon.controller.js";
import { authenticateUser } from "../middleware/user.auth.js";

const router = express.Router();

router.get("/", getAllCoupons);
router.post("/:id/redeem", authenticateUser, redeemCoupon);
router.get("/user/coupons", authenticateUser, getUserCoupons);

export default router;
