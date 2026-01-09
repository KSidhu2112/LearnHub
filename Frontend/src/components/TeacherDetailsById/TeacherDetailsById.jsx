import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./TeacherDetailsById.css";

const TeacherDetailsById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { url, token } = useContext(AuthContext);

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  // Booking states
  const [showBooking, setShowBooking] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  // ✅ FIX: wait until token exists
  useEffect(() => {
    if (token) {
      fetchTeacher();
    }
  }, [token, id]);

  const fetchTeacher = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${url}/api/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setTeacher(res.data.teacher);
        setDescription(res.data.description || "");
      }
    } catch (err) {
      console.error("FETCH TEACHER ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Book Teacher
  const handleBooking = async () => {
    if (!token) {
      alert("Please login to book a teacher");
      navigate("/");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/booking/create`,
        {
          teacherId: teacher._id,
          date,
          time,
          message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("🎉 Booking request sent successfully!");
        setShowBooking(false);
        setDate("");
        setTime("");
        setMessage("");
      }
    } catch (error) {
      alert("Booking failed");
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="teacher-details-container">
      <img
        src={
          teacher.image
            ? `${url}/images/${teacher.image}`
            : "/default-teacher.png"
        }
        alt={teacher.name}
        className="teacher-image"
      />

      <h2>{teacher.name}</h2>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Qualification:</strong> {teacher.qualification}</p>
      <p><strong>Subjects:</strong> {teacher.subjects.join(", ")}</p>
      <p><strong>Experience:</strong> {teacher.experience} years</p>
      <p><strong>Mode:</strong> {teacher.mode}</p>
      <p><strong>Price:</strong> ₹{teacher.price} / hour</p>

      <div className="bio">
        <h4>About</h4>
        <p>{teacher.bio}</p>
        <p>{description}</p>
      </div>

      {/* 🔹 BOOK BUTTON */}
      <button className="book-btn" onClick={() => setShowBooking(true)}>
        Book This Teacher
      </button>

      {/* 🔹 BOOKING MODAL */}
      {showBooking && (
        <div className="booking-modal">
          <div className="booking-box">
            <h3>Book {teacher.name}</h3>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <textarea
              placeholder="Message to teacher"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="booking-actions">
              <button onClick={handleBooking}>Confirm Booking</button>
              <button onClick={() => setShowBooking(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDetailsById;
