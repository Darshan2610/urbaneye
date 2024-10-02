import User from "../models/User.model.js";
import Report from "../models/Report.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken"; // Add this import
import Coupon from "../models/Coupon.model.js"; // Add this import


//remove password access for admin



//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate("user", "username") // This populates the user field with _id and username
      .lean(); // Use lean() for better performance

    // Add username to the report object without removing the user ObjectId
    const reportsWithUsername = reports.map((report) => ({
      ...report,
      username: report.user ? report.user.username : "Unknown User",
      user: report.user ? report.user._id : null, // Keep the original user ObjectId
    }));

    res.status(200).json(reportsWithUsername);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

//get a user details and reports by email

export const getUserDetails = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const reports = await Report.find({ user: user._id });

    const userDetails = {
      user: user.toObject(),
      reports: reports,
    };
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user details and reports",
      error: error.message,
    });
  }
};

//get user details by his id

export const getUserDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
};

// admin updating the issue status

export const updateIssueStatus = async (req, res) => {
  const { reportId } = req.params;
  const { status } = req.body;

  try {
    if (!["pending", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    const oldStatus = report.status;
    report.status = status;
    await report.save();
    if (status === "resolved" && oldStatus !== "resolved") {
      const user = await User.findById(report.user);
      if (user) {
        user.points += 10;
        await user.save();
      }
    }
    res.status(200).json({
      message: "Report status updated successfully",
      report,
      userPointsUpdated: status === "resolved" && oldStatus !== "resolved",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating issue status", error: error.message });
  }
};

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

export const createAdminUser = async (req, res) => {
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
        return res.status(400).json({ message: "admin already exists" });
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
        profilePhotoUrl: req.file ? req.file.path : null,
        role: "admin", // Store the file path in the database
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

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Invalid credentials or non-admin user" });
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
      message: "admin login successful",
      user: userObject,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createCoupon = async (req, res) => {
  try {
    const { brand, description,image, pointsRequired, promoCode } = req.body;

    // Validate input
    if (!brand || !description ||!image|| !pointsRequired || !promoCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if promo code already exists
    const existingCoupon = await Coupon.findOne({ promoCode });
    if (existingCoupon) {
      return res.status(400).json({ message: "Promo code already exists" });
    }

    // Create new coupon
    const newCoupon = new Coupon({
      brand,
      description,
      image,
      pointsRequired,
      promoCode
    });

    // Save the coupon
    await newCoupon.save();

    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error: error.message });
  }
};



//deleting coupon by id

export const deleteCouponById = async (req, res) => {
  const {id} = req.body;

  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}