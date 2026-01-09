import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();
connectDB();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/images", express.static(path.join(process.cwd(), "uploads")));

/* -------------------- REST API Routes -------------------- */
app.use("/api/student", studentRoutes);
app.use("/api/user", userRouter);
app.use("/api/teacher", teacherRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 LearnHub Backend Running");
});

/* -------------------- HTTP Server -------------------- */
const server = http.createServer(app);

/* -------------------- Socket.IO Setup -------------------- */
const io = new Server(server, {
  cors: {
    origin: "*", // later restrict to frontend URL
    methods: ["GET", "POST"],
  },
});

/* -------------------- Socket Logic -------------------- */
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`📌 ${socket.id} joined room ${roomId}`);
  });

  // Air draw
  socket.on("draw", (data) => {
    socket.to(data.roomId).emit("draw", data);
  });

  // Speech → text
  socket.on("speech-text", (data) => {
    socket.to(data.roomId).emit("speech-text", data);
  });

  // Clear board
  socket.on("clear-board", (roomId) => {
    socket.to(roomId).emit("clear-board");
  });

  // Hand raise
  socket.on("hand-raise", (data) => {
    socket.to(data.roomId).emit("hand-raise", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

/* -------------------- Start Server -------------------- */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
