import express from "express";
import upload from "../middleware/upload.js";
import { createStudentProfile, getAllStudents, } from "../controllers/studentController.js";

const router = express.Router();

// POST student profile
router.post(
  "/create",
  upload.single("image"), // must match frontend key
  createStudentProfile
);
router.get("/all", getAllStudents);

export default router;
