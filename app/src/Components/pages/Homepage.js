import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Css/home.css";
import admin from "../../Assets/admin.jpg";
import teacher from "../../Assets/8600.jpg";
import student from "../../Assets/student.jpg";
import school from "../../Assets/school.jpg";
import parent from "../../Assets/parent.jpg";


const Homepage = () => {
  const navigate = useNavigate();
  return (
    
    <div>
        <div className="card-container">
            <div className="card" onClick={e => navigate("/student")}>
                <img className="card-img" src={student} alt="student" ></img>
                <h3>Student</h3>
            
                
            </div>
            <div className="card" onClick={e => navigate("/teacher")}>
                <img className="card-img" src={teacher} alt="teacher" ></img>
                <h3>Teacher </h3>
                
            </div>
            <div className="card" onClick={e => navigate("/parentLogin")}>
                <img className="card-img" src={parent} alt="parent" ></img>
                <h3>Parent</h3>
                
            </div>
            <div className="card" onClick={e => navigate("/adminLogin")}>
                <img className="card-img" src={admin} alt="admin" ></img>
                <h3>Admin</h3>
                
            </div>
            <div className="card" onClick={e => navigate("/schoolDetails")}>
                <img className="card-img" src={school} alt="school" ></img>
                <h3>About school</h3>
                
            </div>
        </div>
        
      
        </div>
    

           
  );
};

export default Homepage;
