import React, { useEffect, useState, useContext } from "react";
import "./StudentsDashboard.css";
import { AuthContext } from "../../context/AuthContext";

const StudentsDashboard = () => {
  const { url } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${url}/api/student/all`);
      const data = await res.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading students...</p>;
  }

  return (
    <div className="students-container">
      <h2>Student Dashboard</h2>

      {students.length === 0 ? (
        <p>No student profiles found</p>
      ) : (
        <div className="students-grid">
  {students.map((student) => (
    <div className="student-card" key={student._id}>
      
      {/* LEFT SIDE */}
      <div className="student-left">
        <img
          src={
            student.image
              ? `${url}/images/${student.image}`
              : "/default-avatar.png"
          }
          alt={student.name}
        />
        <h3>{student.name}</h3>
      </div>

      {/* RIGHT SIDE */}
      <div className="student-right">
        <p><b>Email:</b> {student.email}</p>
        <p><b>Phone:</b> {student.phone}</p>
        <p><b>Education:</b> {student.education}</p>
        <p><b>Skills:</b> {student.skills}</p>
        <p><b>Interests:</b> {student.interests}</p>
        <p className="goal"><b>Goal:</b> {student.goal}</p>
      </div>

    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default StudentsDashboard;
