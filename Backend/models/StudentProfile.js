import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    education: String,
    skills: String,
    interests: String,
    goal: String,
    image: String, // stores image path
  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
