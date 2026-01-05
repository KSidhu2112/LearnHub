import React, { useEffect, useState } from "react";
import "./Students.css";

const StudentProfile = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/student/all");
      const data = await res.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="students-container">
      <h2>Our Students</h2>

      {students.length === 0 ? (
        <p>No student profiles found</p>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <div className="student-card" key={student._id}>
              <img
                src={
                  student.image
                    ? `http://localhost:5000/${student.image}`
                    : "/default-avatar.png"
                }
                alt={student.name}
              />

              <h3>{student.name}</h3>
              <p><b>Email:</b> {student.email}</p>
              <p><b>Education:</b> {student.education}</p>
              <p><b>Skills:</b> {student.skills}</p>
              <p><b>Interests:</b> {student.interests}</p>
              <p className="goal">{student.goal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
