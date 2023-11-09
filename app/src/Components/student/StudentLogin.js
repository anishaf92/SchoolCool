import React,{useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStudent } from "../../actions/studentActions"
import { persistor } from '../../app/store';
import "../../Css/login.css";
import  useAuth  from "../auth/AuthContext";

const StudentLogin = () => {
 
  const [admissionNo, setAdmissionNo] = useState ('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(false);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const registrationSuccess = location.state?.registrationSuccess;
  const {
    setAuthUser,
    setIsLoggedIn } = useAuth();

  async function handleSubmit (e) {
    e.preventDefault()
    console.log("inside handle submit")
    console.log({admissionNo:admissionNo,password:password})

      try {
        const response = await fetch('http://localhost:6969/student/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({ admissionNo, password })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data)
        
        if(data.status === "Success"){
          console.log(data.student,data.token)
          setIsLoggedIn(true)
          setAuthUser(data.student)
          dispatch(loginStudent({studentData : data.student,token : data.token}));
          persistor.flush();
          navigate("/studentDashboard")
        }
        else{
          setError(true)
          navigate("/student")
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

          {console.log(registrationSuccess)}
          
	<div className="form-container sign-in-container">
  
		<form className='form-tag'>

			<h1>Sign in</h1>
			
			<input type="number" placeholder="admissionNo"  onChange={e => setAdmissionNo(e.target.value) } required/>
			<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value) } required/>
			<button onClick={(e) =>handleSubmit(e)}>Sign In</button>
      <div className="new-user">New Admission ? Click here to <button onClick={e => navigate("/studentRegister")}>Sign up</button>
      Or <button onClick={e => navigate("/")}>Go Back</button> </div> 
		</form>
    
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Student!</h1>
				<p className='login'>New Admission ?</p>
				<button id="signUp" onClick={e => navigate("/studentRegister")}>Sign Up</button>
        <button id="signUp" onClick={e => navigate("/")}>Back</button>
			</div>
		</div>
	</div>
</div>
</div>
  );
};
export default StudentLogin;
