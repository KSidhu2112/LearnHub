import React, { useState } from 'react'
import TeachersDisplay from '../../components/TeachersDisplay/TeachersDisplay'
import { useNavigate } from 'react-router-dom';
import TeacherProfile from '../../components/TeacherProfile/TeacherProfile';

const TeachersMenu = () => {
  const [tchoice,TsetCoice]=useState("");

  const navigate=useNavigate();
  return (
    <div>
      <ul>
        <li onClick={()=>TsetCoice("teacher")}>Teachers</li>
        <li onClick={()=>TsetCoice("profile")}>Profile</li>
      </ul>



      {
        tchoice==="teacher" && navigate("/teachersmenu/dashboard")
      }
      {
        tchoice==="profile" && navigate("/teachersmenu/profile")
      }
    </div>
  )
}

export default TeachersMenu
