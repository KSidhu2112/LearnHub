import React from "react";
import { useNavigate } from "react-router-dom";

const TeachersMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ul>
        <li onClick={() => navigate("/teachersmenu/dashboard")}>
          Teachers
        </li>
        <li onClick={() => navigate("/teachersmenu/profile")}>
          Profile
        </li>
      </ul>
    </div>
  );
};

export default TeachersMenu;
