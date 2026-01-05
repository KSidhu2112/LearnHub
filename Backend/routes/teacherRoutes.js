import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById
} from "../controllers/teacherController.js";
import upload from "../middleware/multer.js";

const Trouter = express.Router();

// Trouter.post("/create", upload.single("image"), createTeacher);
// Trouter.get("/all", getAllTeachers);
// Trouter.get("/:id", getTeacherById);

export default Trouter;
