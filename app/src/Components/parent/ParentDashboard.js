import React, {useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { logoutStudent } from "../../reducers/studentReducer";
import { useNavigate,Link} from "react-router-dom";
import "../../Css/dashboard.css";
import { persistor } from '../../app/store';
import GetAnnouncements from "../components/GetAnnouncements";
import StudentProfile from "../student/StudentProfile"
import ViewMarks from "../student/ViewMarks";
import  useAuth  from "../auth/AuthContext";
import CheckAttendance from "../student/CheckAttendance";


const StudentDashboard = (props) => {
  const student = useSelector((state) => state.student.student);
 
  const [showMenu,setShowMenu] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    setAuthUser,
    setIsLoggedIn } = useAuth();
  
  const logout = () =>{

    localStorage.removeItem("ShowUI")
    setIsLoggedIn(false)
    setAuthUser(null)
    dispatch(logoutStudent());
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
      
          <div className = "welcome-text">Welcome { student === null ? <></> : student.parentName} !!!</div>
          
        
        <ul>
            <li>
              <div className="toggle" onClick={(e) => handleMenu()}>
                    <span className="icon"><i class="fas fa-bars"></i></span>
                    <span className="title"></span>
                    
                </div>
            </li>
           
            <li>
                <a href="#section" onClick={(e) => localStorage.setItem("ShowUI","Home")}>
                    <span className="icon"><i class="fas fa-home"></i></span>
                    <span className="title">Home</span>
                </a>
            </li>
            <li>
            <Link to="#profile" onClick={(e) => localStorage.setItem("ShowUI","Profile")}>
                    <span className="icon"><i class="fas fa-user"></i></span>
                    <span className="title">Profile</span>
                </Link>
            </li>
            <li>
            <Link to="#profile" onClick={(e) => localStorage.setItem("ShowUI","Messaging")}>
                    <span className="icon"><i class="fas fa-envelope"></i></span>
                    <span className="title">Messages</span>
                </Link>
            </li>
            <li>
            <Link to="#profile" onClick={(e) => localStorage.setItem("ShowUI","Announcements")}>
                    <span className="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span className="title">Announcements</span>
                </Link>
            </li>
            <li>
            <Link to="#profile" onClick={(e) => localStorage.setItem("ShowUI","ViewMarks")}>
                    <span className="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span className="title">View Marks</span>
                </Link>
            </li>
            <li>
            <Link to="/" onClick={(e) => logout()}>
                    <span className="icon"><i class="fas fa-sign-out-alt"></i></span>
                    <span className="title">Log Out</span>
                </Link>
            </li>
        </ul>
    </nav>
    <div className="main-view">
      <div className="table-container">Welcome to Dashboard! Select Menu from the sidebar.</div>
    {localStorage.getItem("ShowUI") === "Home"? <CheckAttendance /> : <></>}
    {localStorage.getItem("ShowUI") === "Profile"? <StudentProfile /> : <></>} 
    {localStorage.getItem("ShowUI") === "Announcements"? <GetAnnouncements /> : <></>}
    {localStorage.getItem("ShowUI") === "ViewMarks"? <ViewMarks /> : <></>}
    
    </div>
    </div>
       
    </div>
   
  
  )
};

export default StudentDashboard;
