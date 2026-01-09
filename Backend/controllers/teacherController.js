import TeacherProfile from "../models/TeacherProfile.js";
import { generateTeacherProfile } from "../utils/generateTeacherProfile.js";

export const createTeacherProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const imagePath = req.file
  ? `teachers/${req.file.filename}` // ✅ MATCHES FOLDER
  : "";



      // const description = await generateTeacherProfile(req.body);
    const teacher = await TeacherProfile.create({
      name: req.body.name,
      email: req.body.email,
      qualification: req.body.qualification,
      subjects: req.body["subjects[]"], // ARRAY
      experience: req.body.experience,
      bio: req.body.bio,
      price: req.body.price,
      mode: req.body.mode,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "Teacher profile created successfully",
      teacher,
      // description,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create teacher profile",
    });
  }
};



// ✅ GET ALL TEACHERS
// GET ALL TEACHERS
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherProfile.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
    });
  }
};



export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await TeacherProfile.findById(id);


    const description = await generateTeacherProfile(teacher);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher are not found",
      });
    }

    res.status(200).json({
      success: true,
      teacher,
      description
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teacher details",
    });
  }
};

