import React, { useContext, useState } from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import TeacherProfile from './components/TeacherProfile/TeacherProfile'
import StudentMenu from './pages/StudentMenu/StudentMenu'
import TeachersMenu from './pages/TeachersMenu/TeachersMenu'
import StudentProfile from './components/StudentProfile/StudentProfile'
import TeachersDisplay from './components/TeachersDisplay/TeachersDisplay'
import StudentsDashboard from './components/StudentsDashboard/StudentsDashboard'
import TeacherDetailsById from './components/TeacherDetailsById/TeacherDetailsById'
import AirDrawStudent from './components/AirDraw/AirDrawStudent'
import AirDrawTeacher from './components/AirDraw/AirDrawTeacher'

const App = () => {
  const [login,setLogin]=useState(false)
  const [techpro,setTechpro]=useState(false)
  return (
    <div>
      <Navbar login={login} setLogin={setLogin} />
      
        <Routes>
          <Route path='/' element={<Home login={login} setLogin={setLogin} techpro={techpro} setTechpro={setTechpro}/>}/>
         
          <Route path='/studentsmenu' element={<StudentMenu/>}/>
          <Route path='/teachersmenu' element={<TeachersMenu/>}/>

          <Route path='/studentsmenu/dashboard' element={<StudentsDashboard/>}/>
          
          <Route path='studentsmenu/profile' element={<StudentProfile/>}/>
          {/* <Route path='studentsmenu/dashboard' element={<StudentDisplay/>}/> */}
          <Route path='teachersmenu/profile' element={<TeacherProfile/>}/>
          <Route path='teachersmenu/dashboard' element={<TeachersDisplay/>}/>


          <Route path="/teacher/:id" element={<TeacherDetailsById />} />
          
          <Route path="/teacher/airdraw/:roomId" element={<AirDrawTeacher />} />
<Route path="/student/airdraw/:roomId" element={<AirDrawStudent />} />


        </Routes>
      
      <Footer/>
    </div>
  )
}

export default App
