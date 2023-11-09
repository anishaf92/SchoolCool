import React from "react";
import StudentRegistration from "./Components/student/StudentRegistration";
import TeacherRegistration from "./Components/teacher/TeacherRegistration";
import AdminDashboard from "./Components/admin/AdminDashboard";
import TeacherDashboard from "./Components/teacher/TeacherDashboard";
import ParentLogin from "./Components/parent/ParentLogin"
import StudentLogin from "./Components/student/StudentLogin";
import TeacherLogin from "./Components/teacher/TeacherLogin";
import AdminLogin from "./Components/admin/AdminLogin";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Homepage from "./Components/pages/Homepage";
import "./Css/dashboard.css";
import StudentDashboard from "./Components/student/StudentDashboard";
import useAuth from "./Components/auth/AuthContext"
import ParentRegistration from "./Components/parent/ParentRegistration";
import ParentDashboard from "./Components/parent/ParentDashboard";
import Home from "./Components/pages/Home";

 function App () {
  const { isLoggedIn } = useAuth();
  
   return (
      <div>        
        <div className ="header">
        <h1>SchoolCool</h1>
        </div>
        <Router>  
        <Routes>
           <Route path='/' exact element={<Homepage />}/>
           <Route path='/student' element={<StudentLogin />}/>
           <Route path='/studentRegister' element={<StudentRegistration />}/>
           
            <Route path='/studentDashboard' element={isLoggedIn ? <StudentDashboard /> : <StudentLogin />} />
              
          
           
           <Route path='/teacher' element={<TeacherLogin />} />
           <Route path='/adminLogin' element={<AdminLogin />} />
           <Route path="/teacherRegister" element={<TeacherRegistration />} ></Route>
           <Route path="/teacherDashboard" element={isLoggedIn ? <TeacherDashboard /> : <TeacherLogin />} ></Route>
           <Route path="/parentLogin" element={<ParentLogin />} ></Route>
           <Route path="/parentRegister" element={<ParentRegistration />} ></Route>
           <Route path="/parentDashboard" element={isLoggedIn ? <ParentDashboard /> : <ParentLogin />} ></Route>
           <Route path="/adminDashboard" element={isLoggedIn ? <AdminDashboard /> : <AdminLogin />} ></Route>
           <Route path="/schoolDetails" element={<Home />} ></Route>
           </Routes>
      </Router>

        
    </div>
      
  
    
  );
   
 }

export default App;
