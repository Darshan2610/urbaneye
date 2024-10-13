import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken"; // Add this import
import nodemailer from "nodemailer";
import Report from "../models/Report.model.js"; // Import the Report model

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/user_profile/"); // Save uploaded files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Handle file upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 8 }, // 5MB file limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|heic/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
}).single("profilePhoto"); // Use 'profilePhoto' as the field name

//----------------------user registration----------------------------------

// User registration controller
export const userRegister = async (req, res) => {
  // Parse the form with multer
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Make sure req.body is being parsed correctly
    const {
      username,
      email,
      password,
      fullName,
      address,
      phoneNumber,
      aadharNumber,
    } = req.body;

    // If any required fields are missing, return an error
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Check if the user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with or without the profile photo
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        fullName,
        address,
        phoneNumber,
        aadharNumber,
        profilePhotoUrl: req.file ? req.file.path.replace(/\\/g, "/") : null, // Store the file path in the database
      });

      // Save the new user to the database
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

//----------------------user login----------------------------------

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "15d" } // Short-lived token
      );

      const userObject = user.toObject();
      delete userObject.password;

      res.status(200).json({
        message: "Login successful",
        user: userObject,
        token, // Include the JWT in the response
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogout = (req, res) => {
  // Removed cookie-related code
  res.status(200).json({ message: "Logged out successfully" });
};

//----------------------forgot password----------------------------------

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this email address" });
    }

    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // OTP expires in 10 minutes
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        return res
          .status(500)
          .json({ message: "Failed to send OTP", error: error.message });
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json({ message: "OTP sent successfully to your email" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Generate a temporary token for password reset
    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ message: "OTP verified successfully", resetToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//implement forgot password later

export const getMyDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "redeemedCoupons.couponId"
    ); // Populate redeemed coupons
    const reports = await Report.find({ user: req.user._id }); // Fetch reports for the user

    // Prepare the response
    const userDetails = {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      aadharNumber: user.aadharNumber,
      profilePhotoUrl: user.profilePhotoUrl,
      points: user.points,
      // Use filter and check if couponId is present
      redeemedCoupons: user.redeemedCoupons
        .filter((coupon) => coupon.couponId) // Only include coupons with valid couponId
        .map((coupon) => ({
          promoCode: coupon.couponId.promoCode, // Assuming promoCode is a field in the Coupon model
          expiresAt: coupon.expiresAt,
        })),
      reportsPosted: reports.map((report) => ({
        title: report.title,
        status: report.status,
      })),
    };

    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({
      message: "Login successful",
      user: userObject,
      token,
      role: user.role, // Include the role in the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
