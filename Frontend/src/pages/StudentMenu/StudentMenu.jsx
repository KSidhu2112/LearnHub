import React, { useState } from 'react'
import StudentDisplay from '../../components/StudentDisplay/StudentDisplay'
import { useNavigate } from 'react-router-dom'


const StudentMenu = () => {
  const [schoice,ssetChoice]=useState("");

  const navigate=useNavigate();
  return (
    <div>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat nulla officiis et nobis cum blanditiis exercitationem laudantium, rem repudiandae eius fugit tempora voluptate doloremque, alias maiores quisquam delectus dolore?</h2>
      <ul>
        <li onClick={()=>ssetChoice("studentDahsboard")}>Student Dashboard</li>
        <li onClick={()=>ssetChoice("studentprofile")}>Student Profile</li>
      </ul>


    {
      schoice==="studentDahsboard" && navigate("/studentsmenu/dashboard")
      
    }
    {
      schoice==="studentprofile" && navigate("/studentsmenu/profile")
      
    }
      
    </div>
  )
}

export default StudentMenu
