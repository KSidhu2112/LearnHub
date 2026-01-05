import StudentProfile from "../models/StudentProfile.js";

export const createStudentProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const imagePath = req.file
      ? `students/${req.file.filename}`
      : "";

    const student = await StudentProfile.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      education: req.body.education,
      skills: req.body.skills,
      interests: req.body.interests,
      goal: req.body.goal,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "Student profile created",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create profile",
    });
  }
};





// ✅ GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};
