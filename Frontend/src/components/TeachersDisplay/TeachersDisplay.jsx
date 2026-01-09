import React, { useEffect, useState, useContext } from "react";
import "./TeachersDisplay.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TeachersDisplay = () => {
  const { url } = useContext(AuthContext);
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) fetchTeachers();
  }, [url]);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${url}/api/teacher/all`);
      const data = await res.json();

      if (data?.success) {
        setTeachers(data.teachers || []);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading-text">Loading teachers...</p>;
  }

  return (
    <div className="tutors-container">
      <h2>Our Tutors</h2>

      {teachers.length === 0 ? (
        <p className="empty-text">No teachers found</p>
      ) : (
        <div className="tutors-list">
          {teachers.map((teacher) => (
            <div className="teacher-card" key={teacher._id}>
              <img
                src={
                  teacher.image
                    ? `${url}/images/${teacher.image}`
                    : "/default-teacher.png"
                }
                alt={teacher.name}
                className="teacher-image"
                onError={(e) => (e.target.src = "/default-teacher.png")}
              />

              <h3>{teacher.name}</h3>
              <p><strong>Email:</strong> {teacher.email}</p>
              <p><strong>Qualification:</strong> {teacher.qualification}</p>
              <p><strong>Experience:</strong> {teacher.experience || "Fresher"} years</p>

              {/* ✅ MORE DETAILS BUTTON */}
              <button
                className="details-btn"
                onClick={() => navigate(`/teacher/${teacher._id}`)}
              >
                More Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersDisplay;
