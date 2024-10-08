import Coupon from "../models/Coupon.model.js";
import User from "../models/User.model.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true }).select(
      "brand image description pointsRequired promoCode"
    );
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






export const redeemCoupon = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (user.points < coupon.pointsRequired) {
      return res.status(400).json({ message: "Insufficient points" });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    user.points -= coupon.pointsRequired;
    user.redeemedCoupons.push({
      couponId: coupon._id,
      expiresAt: expiryDate,
    });

    await user.save();

    res.status(200).json({
      message: "Coupon redeemed successfully",
      promoCode: coupon.promoCode,
      expiresAt: expiryDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCoupons = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "redeemedCoupons.couponId"
    );
    const validCoupons = user.redeemedCoupons.filter(
      (coupon) => coupon.expiresAt > new Date() && !coupon.isUsed
    );
    res.status(200).json(validCoupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This function should be called periodically (e.g., daily) to remove expired coupons
export const removeExpiredCoupons = async () => {
  const users = await User.find({});
  for (let user of users) {
    user.redeemedCoupons = user.redeemedCoupons.filter(
      (coupon) => coupon.expiresAt > new Date() || coupon.isUsed
    );
    await user.save();
  }
};
