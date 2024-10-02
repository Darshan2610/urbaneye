import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  pointsRequired: { type: Number, required: true },
  promoCode: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
