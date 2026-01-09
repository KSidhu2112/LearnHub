import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    qualification: { type: String, required: true },
    subjects: [{ type: String }], // ARRAY
    experience: { type: Number, required: true },
    bio: { type: String, required: true },
    price: { type: Number, required: true },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      required: true,
    },
    image: { type: String }, // image path
  },
  { timestamps: true }
);

export default mongoose.model("TeacherProfile", teacherSchema);
