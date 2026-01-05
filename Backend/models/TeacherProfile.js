import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    qualification: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    subjects: {
      type: [String],
      required: true
    },
    bio: {
      type: String
    },
    image: {
      type: String   // image URL
    },
    role: {
      type: String,
      default: "teacher"
    }
  },
  { timestamps: true }
);

export default mongoose.model("TeacherProfile", teacherSchema);
