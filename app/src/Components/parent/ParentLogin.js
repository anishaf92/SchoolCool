import React,{useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../auth/AuthContext';
import { persistor } from '../../app/store';
import { loginStudent } from '../../reducers/studentReducer';
import "../../Css/login.css";


const ParentLogin = () => {
  const [mobileNo, setMobileNo] = useState ('');
  const [password, setPassword] = useState ('');
  const [parentDetails, setParentDetails] = useState({})
  const [error,setError] = useState(false);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;

  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();
    async function fetchStudent(admissionNo,token){
      console.log(admissionNo)
    try{
      await fetch(`http://localhost:6969/student/getDetails/${admissionNo}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.student)
        dispatch(loginStudent({studentData : data.student, token: token}));
        return 
       

      })
    }
    catch(error){
      console.log(error)
    }
  }
  async function handleSubmit (e) {
    e.preventDefault()
    console.log("inside handle submit")
    console.log({mobileNo:mobileNo,password:password})

      try {
        const response = await fetch('http://localhost:6969/parent/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobileNo, password })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data)
        
        if(data.status === "Success"){
          console.log(data.parent,data.token)
          setParentDetails(data.parent)
          
          setAuthUser(data.parent)
          setIsLoggedIn(true)
          await fetchStudent(data.parent.admissionNo,data.token);
          
          
          persistor.flush();
          navigate("/parentDashboard")
        }
        else{
          setError(true)
          navigate("/parentLogin")
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
                Registration was successfull!.
              </div>
            )}
      
            {error? <div className="error">Wrong Credentials !! Please try again with correct mobile Number and Password</div> : <div></div>}
<div className="container" id="container">

          
          
	<div className="form-container sign-in-container">
        
		<form className='form-tag'>
			<h1>Sign in</h1>
			<input type="number" placeholder="Mobile No"  onChange={e => setMobileNo(e.target.value) } required/>
			<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value) } required/>
			<button onClick={(e) =>handleSubmit(e)}>Sign In</button>
      <div className="new-user">Click here to <button onClick={e => navigate("/parentRegister")}>Register</button>
      Or <button onClick={e => navigate("/")}>Go Back</button>  </div> 
		</form>
    
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Parent!</h1>
                <p className='login'>New Admission ?</p>
				<button id="signUp" onClick={e => navigate("/parentRegister")}>Sign Up</button>
        <button id="signUp" onClick={e => navigate("/")}>Back</button>
				
			</div>
		</div>
	</div>
</div>
</div>
  );
};
export default ParentLogin;
