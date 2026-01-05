import React, { useContext } from "react";
import StudentDisplayItems from "../StudentDisplayItems/StudentDisplayItems";
import "./StudentDisplay.css";
// import img from '../../assets/Teachers/andria.png'
import { AuthContext } from "../../context/AuthContext";

const StudentDisplay = () => {
  const { Students } = useContext(AuthContext);

  // ✅ bullet-proof check
  if (!Array.isArray(Students) || Students.length === 0) {
    <img src="../../assets/Teachers/andria.png" alt="" />
    return <p>No Students found</p>;
  }
  

  return (
    <div className="display-all">
      <h2>Student</h2>

      <div className="grid">
        {Students.map((item) => (
          <StudentDisplayItems key={item.id} item={item} />
        ))}
      </div>

      
    </div>
  );
};

export default StudentDisplay;
