import React, { useContext } from "react";
import TeachersDisplayItems from "../TeachersDisplayItems/TeachersDisplayItems";
import "./TeachersDisplay.css";
// import img from '../../assets/Teachers/andria.png'
import { AuthContext } from "../../context/AuthContext";

const TeachersDisplay = () => {
  const { Teachers } = useContext(AuthContext);

  // ✅ bullet-proof check
  if (!Array.isArray(Teachers) || Teachers.length === 0) {
    return <p>No Teachers found</p>;
  }
  

  return (
    <div className="display-all">
      <h2>Teachers</h2>

      <div className="grid">
        {Teachers.map((item) => (
          <TeachersDisplayItems key={item.id} item={item} />
        ))}
      </div>

      
    </div>
  );
};

export default TeachersDisplay;
