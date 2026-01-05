import TeacherProfile from "../models/TeacherProfile.js";

/* CREATE TEACHER */
export const createTeacher = async (req, res) => {
  try {
    const teacher = new TeacherProfile({
      ...req.body,
      image: req.file ? `/students/${req.file.filename}` : ""
    });

    await teacher.save();

    res.status(201).json({
      success: true,
      message: "Teacher profile created",
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* GET ALL TEACHERS */
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherProfile.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* GET SINGLE TEACHER */
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await TeacherProfile.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    res.json({ success: true, teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
