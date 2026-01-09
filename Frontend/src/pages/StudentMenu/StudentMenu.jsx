import React from "react";
import { useNavigate } from "react-router-dom";

const StudentMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Student Menu</h2>

      <ul>
        <li onClick={() => navigate("/teachersmenu/dashboard")}>
          Student Dashboard
        </li>

        <li onClick={() => navigate("/studentsmenu/profile")}>
          Student Profile
        </li>
      </ul>
    </div>
  );
};

export default StudentMenu;
