import React, { useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,Link} from "react-router-dom";
import "../../Css/dashboard.css";
import { persistor } from '../../app/store';
import StudentApproval from "./StudentApproval";
import TeacherApproval from "./TeacherApproval";
import EditSubject from "./EditSubject";
import AssignTeacher from "./AssignTeacher";
import Announcements from "./Announcements";
import { logoutAdmin } from "../../reducers/adminReducer";
import useAuth from "../auth/AuthContext";


const AdminDashboard = () => {
  const admin = useSelector((state) => state.admin.admin);
  const [showMenu,setShowMenu] = useState(false)
  const {
    setAuthUser,
    setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  localStorage.setItem("showUI","Home")
  
  const logout = () =>{
    localStorage.removeItem("ShowUI")
    dispatch(logoutAdmin());
    setIsLoggedIn(false)
    setAuthUser(null)
    persistor.purge();
    navigate("/")
  }
  
  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

 
  return (
    <div>
      <div className="container-dashboard">  
        <nav className = {showMenu? "nav-class" : ""}>     
          <div className = "welcome-text">Welcome { admin === undefined ? <></> : admin.userName} !!!</div>
        <ul>
          <li>
              <div className="#toggle" onClick={(e) => handleMenu()}>
                    <span className="icon"><i class="fas fa-bars"></i></span>
                    <span className="title"></span>
                    
                </div>
            </li>
           
            <li>
            <a href="#studentApproval" onClick={(e) => localStorage.setItem("ShowUI","studentApproval")}>
                    <span className="icon"><i class="fa-solid fa-graduation-cap"></i></span>
                    <span className="title">Student Approval</span>
                </a>
            </li>
            <li>
            <Link to="#teacherApproval" onClick={(e) => localStorage.setItem("ShowUI","teacherApproval")}>
                    <span className="icon"><i class="fa-solid fa-person-circle-check"></i></span>
                    <span className="title">Teacher Approval</span>
                </Link>
            </li>
            <li>
            <Link to="#announcement" onClick={(e) => localStorage.setItem("ShowUI","announcement")}>
                    <span className="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span className="title">Announcement</span>
                </Link>
            </li>
            <li>
            <Link to="#editSubject" onClick={(e) => localStorage.setItem("ShowUI","editSubject")}>
                    <span className="icon"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span className="title">Edit Subject</span>
                </Link>
            </li>
            <li>
            <Link to="#assignTeacher" onClick={(e) => localStorage.setItem("ShowUI","assignTeacher")}>
                    <span className="icon"><i class="fa-solid fa-plus"></i></span>
                    <span className="title">Assign Teacher</span>
                </Link>
            </li>
            <li>
            <Link to="/adminLogin" onClick={(e) => logout()}>
                    <span className="icon"><i class="fas fa-sign-out-alt"></i></span>
                    <span className="title">Log Out</span>
                </Link>
            </li>
        </ul>
    </nav>
    <div className="main-view">
    <div className="table-container">Welcome to Dashboard! Select Menu from the sidebar.</div>
      {localStorage.getItem("ShowUI") === "studentApproval"? <StudentApproval /> : <></>}
      {localStorage.getItem("ShowUI") === "teacherApproval"? <TeacherApproval /> : <></>} 
      {localStorage.getItem("ShowUI") === "announcement"? <Announcements /> : <></>}
      {localStorage.getItem("ShowUI") === "editSubject"? <EditSubject /> : <></>}
      {localStorage.getItem("ShowUI") === "assignTeacher"? <AssignTeacher /> : <></>}
    </div>
    </div>
      
        
    </div>
   
  
  )
};

export default AdminDashboard;

