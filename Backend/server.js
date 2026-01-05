import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import Trouter from "./routes/teacherRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// serve images
app.use("/images", express.static(path.join(process.cwd(), "uploads")));

// routes
app.use("/api/student", studentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("🚀 LearnHub Backend Running");
});

app.use("/api/teacher", Trouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
