import React,{useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { loginTeacher } from "../../actions/teacherActions"
import { persistor } from '../../app/store';
import { useDispatch } from 'react-redux';
import "../../Css/login.css";
import useAuth from '../auth/AuthContext';
const TeacherLogin = () => {
  const [empNo, setEmpNo] = useState (0);
  const [password, setPassword] = useState ('');
  const [error,setError] = useState(false)
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;
  const {
    setAuthUser,
    setIsLoggedIn } = useAuth();
    const url = process.env.REACT_APP_BASE_URL;
  

  async function handleSubmit (e) {
    e.preventDefault()
    console.log("inside handle submit")
    console.log({empNo:empNo,password:password})
      try {
        const response = await fetch(`${url}/teacher/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ empNo, password })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data)
        if(data.status === "Success"){
          console.log(data.teacher,data.token)
          setIsLoggedIn(true)
          setAuthUser(data.teacher)
          dispatch(loginTeacher({teacherData : data.teacher,token : data.token}));
          persistor.flush();
          navigate("/teacherDashboard")
        }
        else{
          setError(true)
          navigate("/teacher")
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here.
      }
        
    
  }
  return (
    <div className='body-container'>
      {registrationSuccess && (
              <div className="success-message">
                Registration was successful! Please wait until we approve your profile.
              </div>
            )}
            {error? <div className="error">Wrong Credentials !! Please try again with correct Admission Number and Password</div> : <div></div>}
<div className="container" id="container">

         
          
	<div className="form-container sign-in-container">
  
		<form className='form-tag'>

			<h1>Sign in</h1>
			
			<input type="number" placeholder="Employee Number"  onChange={e => setEmpNo(e.target.value) } required/>
			<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value) } required/>
			<button onClick={(e) =>handleSubmit(e)}>Sign In</button>
      <div className="new-user">New Teacher ? Click here to <button onClick={e => navigate("/teacherRegister")}>Sign up</button>
      Or <button onClick={e => navigate("/")}>Go Back</button> </div> 
		</form>
    
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Teacher!</h1>
				<p className='login'>New Teacher ?</p>
				<button id="signUp" onClick={e => navigate("/teacherRegister")}>Sign Up</button>
        <button id="signUp" onClick={e => navigate("/")}>Back</button>
			</div>
		</div>
	</div>
</div>




</div>
   
  );
};
export default TeacherLogin;
