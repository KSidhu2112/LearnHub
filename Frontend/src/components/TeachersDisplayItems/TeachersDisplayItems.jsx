import React from "react";
import "./TeachersDisplayItems.css";

const TeachersDisplayItems = ({ item }) => {
  return (
    <div className="card">
      {/* ✅ Safe Image */}
      <img
        src={item.profileImage || "/default-avatar.png"}
        alt={item.name || "Student"}
        className="card-img"
      />

      <h3>{item.name}</h3>
      <p className="role">{item.role}</p>

      {/* ✅ Conditional fields */}
      {item.grade && (
        <p>
          <strong>Grade:</strong> {item.grade}
        </p>
      )}

      {item.experience && (
        <p>
          <strong>Experience:</strong> {item.experience}
        </p>
      )}

      {/* ✅ Safe array rendering */}
      {Array.isArray(item.subjects) && item.subjects.length > 0 && (
        <p>
          <strong>Subjects:</strong> {item.subjects.join(", ")}
        </p>
      )}

      {Array.isArray(item.courses) && item.courses.length > 0 && (
        <p>
          <strong>Courses:</strong> {item.courses.join(", ")}
        </p>
      )}

      {Array.isArray(item.coursesOffered) &&
        item.coursesOffered.length > 0 && (
          <p>
            <strong>Courses Offered:</strong>{" "}
            {item.coursesOffered.join(", ")}
          </p>
        )}

      {item.teachingMode && (
        <p>
          <strong>Mode:</strong> {item.teachingMode}
        </p>
      )}

      {item.email && <p className="email">{item.email}</p>}
    </div>
  );
};

export default TeachersDisplayItems;
