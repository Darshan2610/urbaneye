import express from "express";
import { createReport, getReports } from "../controllers/report.controller.js";
import { authenticateUser } from "../middleware/user.auth.js"; // Assuming you have authentication middleware

const router = express.Router();

router.post("/", authenticateUser, createReport);
router.get("/", getReports);

export default router;
