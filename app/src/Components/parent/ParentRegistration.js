import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/registration.css";


const ParentRegistration = () => {
    const [parentDetails,setParentDetails] = useState({
        admissionNo:"",
        name:"",
        password:"",
        mobileNo:""
    })
    const [passwordError, setPasswordError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
   
  const navigate = useNavigate();
  
  const handleConfirmPassword = (password) => {
    if(parentDetails.password !== password ){
      setPasswordError(true)
    }
    else{
      setPasswordError(false)
   

    }
  }
  const checkPhoneNo = (no) =>{
    if(no.length === 10){
      setParentDetails({...parentDetails,mobileNo:no})
      setPhoneError(false)
      return false
    }
    else{
      setPhoneError(true)
      return true
      

    }
  }
  
    function validateForm() {

      if(passwordError === true || phoneError === true ){
        console.log("validate",false)
        return false
      }
      else{
        console.log("validate",true)
        return true
      }
      
    }
    async function handleSubmit(event) {
      event.preventDefault();
      console.log(parentDetails)
      
      if (validateForm()){
        await fetch('https://schoolcool-backend-tov4.onrender.com/parent/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode':'no-cors'
          },
          body: JSON.stringify(parentDetails)
        }).then((response) =>{
          return response.json()
        }).then((data) => {
           console.log(data)
           if(data.status === "Success"){
            setRegistrationSuccess(true);
            navigate("/parentLogin",{ state: { registrationSuccess: true } })
           }
           else{
             navigate("/")
           
           }
         });
      }
      else{
        return
      }
      }
      
      
    
    return (
      <div>
      {registrationSuccess && (
        <div className="success-message">Registration was successful!</div>
      )}
     <form >
      <div className="container-reg">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>

      <div className="input-parent">
        <label>Admission no of your ward<span className="required">*</span> </label>
        <input type="number" id="admissionno" onChange={(e) => setParentDetails({...parentDetails,admissionNo:e.target.value})} required/>
      </div>
      
      <div className="input-parent">
        <label>Name <span className="required">*</span></label>
        <input type="text" id="name" onChange={(e) => setParentDetails({...parentDetails,name:e.target.value})} required />
      </div>
      

      <div className="input-parent">
        <label>Password <span className="required">*</span></label>
        <input type="password" id="password" onChange={(e) => setParentDetails({...parentDetails,password:e.target.value})} required/>
      </div>
      

      <div className="input-parent">
        <label>Confirm Password <span className="required">*</span></label>
        <input type="password" id="confirmpassword" onChange={(e) => handleConfirmPassword(e.target.value)} required/>
      </div>
      {passwordError? <div className="error">Passwords does not match</div> : <></>}
      
      <div className="input-parent">
        <label>Phone Number , You will be logging in using your mobile number  <span className="required">*</span></label>
        <input type="number" id="phoneno" onChange={(e) => checkPhoneNo(e.target.value)} required/>
      </div>
      {phoneError? <div className="error">Please enter a valid phone number</div> : <></>}
  
      
      
  
      <button type="submit" onClick ={(e) => handleSubmit(e)}>Register</button>
      <button onClick={e => navigate("/")}>Exit</button>
        
      </div>
    </form>
    </div>
    
   
   
  )
};

export default ParentRegistration;
