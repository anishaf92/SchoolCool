import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { logoutTeacher } from "../../reducers/teacherReducer";
import { useNavigate ,Link} from "react-router-dom";
import "../../Css/dashboard.css";
import { persistor } from '../../app/store';
import GetAnnouncements from "../components/GetAnnouncements";
import TeacherProfile from "./TeacherProfile";
import Marks from "./Marks";
import UpdateAttendance from "./UpdateAttendance";


const TeacherDashboard = (props) => {
  const teacher = useSelector((state) => state.teacher.teacher);
  const token = useSelector((state) => state.teacher.token);
  const [showUI , setShowUI] = useState("Home");
  const [showMenu,setShowMenu] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = () =>{
    dispatch(logoutTeacher());
    persistor.purge();
    navigate("/teacher")
  }

 
const handleMenu = () => {
  setShowMenu(!showMenu)
}
 
  return (
    <div>
      {teacher.isApproved ?(
    <div className="container-dashboard">
         
        
        <nav className = {showMenu? "nav-class" : ""}>
      
          <div className = "welcome-text">Welcome { teacher === null ? <></> : teacher.name} !!!</div>
          
        
        <ul>
            <li>
                <a href="#section" class="toggle" onClick={(e) => handleMenu()}>
                    <span class="icon"><i class="fas fa-bars"></i></span>
                    <span class="title"></span>
                    
                </a>
            </li>
           
            <li>
            <Link to="#attendance" onClick={(e) => localStorage.setItem("ShowUI","Home")}>
                    <span class="icon"><i class="fas fa-home"></i></span>
                    <span class="title">Update Attendance</span>
                </Link>
            </li>
            <li>
            <Link to="#profile" onClick={(e) => localStorage.setItem("ShowUI","Profile")}>
                    <span class="icon"><i class="fas fa-user"></i></span>
                    <span class="title">Profile</span>
                </Link>
            </li>
            <li>
            <Link to="#Announcements" onClick={(e) => localStorage.setItem("ShowUI","Announcements")}>
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span class="title">Announcements</span>
                </Link>
            </li>
            <li>
            <Link to="#Marks" onClick={(e) => localStorage.setItem("ShowUI","Marks")}>
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span class="title">Update Marks</span>
                </Link>
            </li>
            <li>
                <Link to="/teacher" onClick={() => logout()}>
                    <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
                    <span class="title">Log Out</span>
                </Link>
            </li>
        </ul>
    </nav>
    <div className="main-view">
    <div className="table-container">Welcome to Dashboard! Select Menu from the sidebar.</div>
    {localStorage.getItem("ShowUI") === "Home"? <UpdateAttendance />:<></>}
    {localStorage.getItem("ShowUI") === "Profile"? <TeacherProfile /> : <></>}
    {localStorage.getItem("ShowUI") === "Announcements"? <GetAnnouncements /> : <></>}
    {localStorage.getItem("ShowUI") === "Marks"? <Marks /> : <></>}
  
    </div>
    </div>)
    :
    (
      
        <div>
        <h4 className="center"> Verification under process. Please wait until our Admin approves your profile</h4>
        <h4 className="center">Try logging after sometime. You can still checkout details about our school here </h4>
        <h4 className="center"><Link to="/schoolDetails" onClick={logout}>About School</Link></h4>
        <h4 className="center"><Link to="/" onClick={logout}>Back to homepage</Link></h4>
        </div>

      
    )}
    </div>
   
  
  )
};

export default TeacherDashboard;

