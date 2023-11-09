import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/registration.css";


const StudentRegistration = () => {
    const [studentDetails,setStudentDetails] = useState({
        admissionNo:"",
        name:"",
        gender:"",
        password:"",
        dob:"",
        grade:"",
        parentName:"",
        parentNo:"",
        parentEmail:"",
        address:{
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pinCode: 0
              }
    })
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [refresh,setRefresh] = useState(true)
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
   
  const navigate = useNavigate();
  function checkEmail(email){
    const pattern = /[a-zA-Z0-9]+[\\.]?([a-zA-Z0-9]+)?[\\@][a-z]{3,9}[\\.][a-z]{2,5}/g;
    
    const result = pattern.test(email);
    if (result === false){
      setEmailError(true)
      return false
    }
    else{
      setEmailError(false)
      setRefresh(!refresh)
      setStudentDetails({...studentDetails, parentEmail:email})
      return true
    }

  }
  const checkPhoneNo = (no) =>{
    if(no.length === 10){
      setStudentDetails({...studentDetails,parentNo:no})
      setPhoneError(false)
      return false
    }
    else{
      setPhoneError(true)
      return true
      

    }
  }
  
    function validateForm() {

      if(passwordError === true || emailError === true || phoneError === true ){
        console.log("validate",false)
        return false
      }
      else{
        console.log("validate",false)
        return true
      }
      
    }
    async function handleSubmit(event) {
      event.preventDefault();
      console.log(studentDetails)
      if (validateForm()){
        await fetch('https://schoolcool-backend-tov4.onrender.com/student/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode':'no-cors'
          },
          body: JSON.stringify(studentDetails)
        }).then((response) =>{
          return response.json()
        }).then((data) => {
           console.log(data)
           if(data.status === "Success"){
            setRegistrationSuccess(true);
            navigate("/student",{ state: { registrationSuccess: true } })
           }
           else{
             navigate()
           
           }
         });
      }
      else{
        return
      }
      }
      
      
      const handleConfirmPassword = (password) => {
        if(studentDetails.password !== password ){
          setPasswordError(true)
        }
        else{
          setPasswordError(false)
       

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
        <label>Admission No <span className="required">*</span> </label>
        <input type="number" id="admissionno" onChange={(e) => setStudentDetails({...studentDetails,admissionNo:e.target.value})} required/>
      </div>
      
      <div className="input-parent">
        <label>Name <span className="required">*</span></label>
        <input type="text" id="name" onChange={(e) => setStudentDetails({...studentDetails,name:e.target.value})} required />
      </div>
      

      <div className="input-parent">
        <label>Password <span className="required">*</span></label>
        <input type="password" id="password" onChange={(e) => setStudentDetails({...studentDetails,password:e.target.value})} required/>
      </div>
      

      <div className="input-parent">
        <label>Confirm Password <span className="required">*</span></label>
        <input type="password" id="confirmpassword" onChange={(e) => handleConfirmPassword(e.target.value)} required/>
      </div>
      {passwordError? <div className="error">Passwords does not match</div> : <></>}
      
      <div className="input-parent">
        <label>Date of Birth <span className="required">*</span></label>
      <input type='date'
      value={studentDetails.dob} onChange={(e)=> setStudentDetails({...studentDetails,dob:e.target.value})}
      name='dob'/>
    </div>
    
    <div className="input-parent">
      <label htmlFor="grade">Grade <span className="required">*</span></label>
        <input type="Number" id="grade" min={1} max={10} step={1} onChange={(e) => setStudentDetails({...studentDetails,grade:e.target.value})}  required/>
      </div>
      
      
      <div className="input-parent">
      <label for="radio">Gender <span className="required">*</span></label>
      <div className="gen-buttons">
    <input type="radio" name="radio" id="radio1" value="male" onChange={(e) => setStudentDetails({...studentDetails,gender:e.target.value})} required/>
    <label htmlFor="radio1" className="radio-label">Male</label>
    </div>
    <div className="gen-buttons">
    <input type="radio" name="radio" id="radio2" value="female" onChange={(e) => setStudentDetails({...studentDetails,gender:e.target.value})} required/>
    <label htmlFor="radio2">Female</label>
    </div>
    
    </div>
    

      <div className="input-parent">
        <label>Parent Name <span className="required">*</span></label>
        <input type="text" id="pname" onChange={(e) => setStudentDetails({...studentDetails,parentName:e.target.value})} required/>
      </div>
      

      <div className="input-parent">
        <label>Parent Phone Number <span className="required">*</span></label>
        <input type="number" id="phoneno" onChange={(e) => checkPhoneNo(e.target.value)} required/>
      </div>
      {phoneError? <div className="error">Please enter a valid phone number</div> : <></>}
  
      <div className="input-parent">
        <label>Parent Email id <span className="required">*</span></label>
        <input type="text" id="username"onChange={(e) => checkEmail(e.target.value)} required/>
      </div>
      {emailError? <div className="error">Please enter a valid email id</div> : <></>}

      <div className="input-parent">
        <label>Enter your Address : </label>
        <label>Address Line1 <span className="required">*</span></label>
        <input type="text" id="addressl1" onChange={(e) => setStudentDetails({...studentDetails,address:{...studentDetails.address,addressLine1:e.target.value}})} required/>
        
        <label>Address Line2</label>
        <input type="text" id="addressl2" onChange={(e) => setStudentDetails({...studentDetails,address:{...studentDetails.address,addressLine2:e.target.value}})} />
        <label>City <span className="required">*</span></label>
        <input type="text" id="city" onChange={(e) => setStudentDetails({...studentDetails,address:{...studentDetails.address,city:e.target.value}})} required/>
        
        <label>State <span className="required">*</span></label>
        <input type="text" id="state" onChange={(e) => setStudentDetails({...studentDetails,address:{...studentDetails.address,state:e.target.value}})} required/>
        
        <label>Pin code <span className="required">*</span></label>
        <input type="number" id="pincode" onChange={(e) => setStudentDetails({...studentDetails,address:{...studentDetails.address,pinCode:e.target.value}})} required/>
        
      
      </div>
  
      <button type="submit" onClick ={(e) => handleSubmit(e)}>Register</button>
      <button onClick={e => navigate("/")}>Exit</button>
        </div>
    </form>
    </div>
    
   
   
  )
};

export default StudentRegistration;
