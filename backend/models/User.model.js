import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  aadharNumber: { type: String, required: true, unique: true },
  profilePhotoUrl: { type: String, required: true },
  redeemedCoupons: [{
    couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    redeemedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false }
  }],
  points: { type: Number, default: 0 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  resetPasswordOTP: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = mongoose.model("User", userSchema);
export default User;
