import Report from "../models/Report.model.js";
import multer from "multer";
import path from "path";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/report_photo/"); // Save uploaded files in 'uploads/report_images' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Handle file upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 8 }, // 8MB file limit
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
}).array("reportImages", 5); // Allow up to 5 images

export const createReport = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { title, description, location } = req.body;
    const userId = req.user._id; // This is now available thanks to the auth middleware

    if (!title || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }


    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    try {
      const imageUrls = req.files.map(file => file.path);

      const newReport = new Report({
        title,
        description,
        location,
        imageUrls,
        user: userId

      });

      await newReport.save();
      res.status(201).json({ message: "Report created successfully", report: newReport });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('user', 'username');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};