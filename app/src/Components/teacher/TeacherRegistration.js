import React, {useEffect, useState} from 'react';
import '../../Css/registration.css';
import {useNavigate} from 'react-router-dom';

const TeacherRegistration = () => {
  const navigate = useNavigate ();
  const [subjectList, setSubjectList] = useState ([]);
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [refresh,setRefresh] = useState(true)
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState ({
    empNo: '',
    name: '',
    gender: '',
    password: '',
    dob:'',
    subject1: '',
    subject2:'',
    contactNo: '',
    email: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pinCode: '',
    },
  });
  const handleConfirmPassword = (password) => {
    if(teacherDetails.password !== password ){
      setPasswordError(true)
    }
    else{
      setPasswordError(false)
   

    }
  }

  useEffect (() => {
    fetch ('https://schoolcool-backend-tov4.onrender.com/teacher/getuniquesubjects')
      .then (response => {
        console.log (response);
        return response.json ();
      })
      .then (data => {
        console.log (data);
        setSubjectList (data);
      });
  }, []);

  function checkEmail(email){
    // eslint-disable-next-line
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    
    const result = pattern.test(email);
    if (result === false){
      setEmailError(true)
      return false
    }
    else{
      setEmailError(false)
      setRefresh(!refresh)
      setTeacherDetails({...teacherDetails,email:email})
      return true
    }

  }
  const checkPhoneNo = (no) =>{
    if(no.length === 10){
      setTeacherDetails({...teacherDetails,contactNo:no})
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
    console.log(teacherDetails)
    if (validateForm()){
      await fetch('https://schoolcool-backend-tov4.onrender.com/teacher/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode':'no-cors'
        },
        body: JSON.stringify(teacherDetails)
      }).then((response) =>{
        return response.json()
      }).then((data) => {
         console.log(data)
         if(data.status === "Success"){
          setRegistrationSuccess(true);
          navigate("/teacher",{ state: { registrationSuccess: true } })
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
      <label>Employee No <span className="required">*</span> </label>
      <input type="number" id="admissionno" onChange={(e) => setTeacherDetails({...teacherDetails,empNo:e.target.value})} required/>
    </div>
    
    <div className="input-parent">
      <label>Name <span className="required">*</span></label>
      <input type="text" id="name" onChange={(e) => setTeacherDetails({...teacherDetails,name:e.target.value})} required />
    </div>
    

    <div className="input-parent">
      <label>Password <span className="required">*</span></label>
      <input type="password" id="password" onChange={(e) => setTeacherDetails({...teacherDetails,password:e.target.value})} required/>
    </div>
    

    <div className="input-parent">
      <label>Confirm Password <span className="required">*</span></label>
      <input type="password" id="confirmpassword" onChange={(e) => handleConfirmPassword(e.target.value)} required/>
    </div>
    {passwordError? <div className="error">Passwords does not match</div> : <></>}
    
    <div className="input-parent">
      <label>Date of Birth <span className="required">*</span></label>
    <input type='date'
    value={teacherDetails.dob} onChange={(e)=> setTeacherDetails({...teacherDetails,dob:e.target.value})}
    name='dob'/>
  </div>
  
    
    <div className="input-parent">
    <label for="radio">Gender <span className="required">*</span></label>
    <div className="gen-buttons">
  <input type="radio" name="radio" id="radio1" value="male" onChange={(e) => setTeacherDetails({...teacherDetails,gender:e.target.value})} required/>
  <label htmlFor="radio1" className="radio-label">Male</label>
  </div>
  <div className="gen-buttons">
  <input type="radio" name="radio" id="radio2" value="female" onChange={(e) => setTeacherDetails({...teacherDetails,gender:e.target.value})} required/>
  <label htmlFor="radio2">Female</label>
  </div>
  
  </div>
  <div className="input-parent">
  <label htmlFor="subject1">
        Choose Subject with Priority 1
           <select
            id="subject1"
            name="subject1"
            disabled={!subjectList.length}
            value={teacherDetails.subject1}
            onChange={e =>
              setTeacherDetails ({...teacherDetails, subject1: e.target.value})}
          >
            <option value="" required />
            {subjectList.map ((subject, key) => (
              <option value={subject}>{subject}</option>
            ))}

          </select>

        </label>
        <label htmlFor="subject2">
          Choose Subject with Priority 2
          <select
            id="subject2"
            name="subject2"
            disabled={!subjectList.length}
            value={teacherDetails.subject2}
            onChange={e =>
              setTeacherDetails ({...teacherDetails, subject2: e.target.value})} required
          >
            <option value="" />
            {subjectList.map ((subject, key) => (
              <option value={subject}>{subject}</option>
            ))}

          </select>

        </label>
        </div>

    <div className="input-parent">
      <label>Phone Number <span className="required">*</span></label>
      <input type="number" id="phoneno" onChange={(e) => checkPhoneNo(e.target.value)} required/>
    </div>
    {phoneError? <div className="error">Please enter a valid phone number</div> : <></>}

    <div className="input-parent">
      <label>Email id <span className="required">*</span></label>
      <input type="text" id="username"onChange={(e) => checkEmail(e.target.value)} required/>
    </div>
    {emailError? <div className="error">Please enter a valid email id</div> : <></>}

    <div className="input-parent">
      <label>Enter your Address : </label>
      <label>Address Line1 <span className="required">*</span></label>
      <input type="text" id="addressl1" onChange={(e) => setTeacherDetails({...teacherDetails,address:{...teacherDetails.address,addressLine1:e.target.value}})} required/>
      
      <label>Address Line2</label>
      <input type="text" id="addressl2" onChange={(e) => setTeacherDetails({...teacherDetails,address:{...teacherDetails.address,addressLine2:e.target.value}})} />
      <label>City <span className="required">*</span></label>
      <input type="text" id="city" onChange={(e) => setTeacherDetails({...teacherDetails,address:{...teacherDetails.address,city:e.target.value}})} required/>
      
      <label>State <span className="required">*</span></label>
      <input type="text" id="state" onChange={(e) => setTeacherDetails({...teacherDetails,address:{...teacherDetails.address,state:e.target.value}})} required/>
      
      <label>Pin code <span className="required">*</span></label>
      <input type="number" id="pincode" onChange={(e) => setTeacherDetails({...teacherDetails,address:{...teacherDetails.address,pinCode:e.target.value}})} required/>
      
    
    </div>

    <button type="submit" onClick ={(e) => handleSubmit(e)}>Register</button>
    <button onClick={e => navigate("/")}>Exit</button>
      </div>
  </form>
  </div>

    
    
  );
};

export default TeacherRegistration;
