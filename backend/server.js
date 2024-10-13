import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import reportRoutes from "./routes/report.route.js";
import adminRoutes from "./routes/admin.route.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";
import couponRoutes from "./routes/coupon.route.js";

// Configurations for path (if using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Allow only your frontend origin
    credentials: true, // Allow cookies and credentials
  })
);
app.use(
  "/uploads/user_profile",
  express.static(path.join(__dirname, "uploads/user_profile"))
); // Serve uploaded files statically
app.use(
  "/uploads/report_photo",
  express.static(path.join(__dirname, "uploads/report_photo"))
); // Serve report images statically
const MONGODB_URI = process.env.MONGODB_URI;
// Connect to MongoDB

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/coupons", couponRoutes);

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/build"))); // Change 'dist' to 'build'
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "frontend", "build", "index.html")); // Change 'dist' to 'build'
  });
}

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
