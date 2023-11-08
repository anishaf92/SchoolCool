import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from '../../app/store';
import moment from "moment";
import { updateTeacher } from "../../reducers/teacherReducer";


const TeacherProfile = () => {
  const [textBox1,setTextBox1] = useState(false);
  const [textBox2,setTextBox2] = useState(false);
  const [textBox3,setTextBox3] = useState(false);
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [success,setSuccess] = useState(false);

  const teacher = useSelector((state) => state.teacher.teacher);
  const token = useSelector((state) => state.teacher.token);
  const [contactNo,setContactNo] = useState(teacher.contactNo);
  const [email,setEmail] = useState(teacher.email);
  const [address,setAddress] = useState(teacher.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function checkEmail(email){
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    
    const result = pattern.test(email);
    if (result === false){
      setEmailError(true)
      return false
    }
    else{
      setEmailError(false)
      setEmail(email)
      return true
    }

  }
  const checkPhoneNo = (no) =>{
    if(no.length === 10){
      setContactNo(no)
      setPhoneError(false)
      return false
    }
    else{
      setPhoneError(true)
      return true
      

    }
  }

  function validateForm() {

    if(emailError === true || phoneError === true ){
      console.log("validate",false)
      return false
    }
    else{
      console.log("validate",true)
      return true
    }
    
  }
  const handleEdit = async (e) =>{
    e.preventDefault();
    console.log(teacher._id)
    if(validateForm()){
    
    try {
        const response = await fetch(`http://localhost:6969/teacher/updateInfo/${teacher._id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({ contactNo, email, address })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data)
        if(data.result === "Success"){
          
          console.log(data.teacherData)  
          dispatch(updateTeacher({teacherData: data.teacherData}))   
          setTextBox1(false)
          setTextBox2(false)
          setTextBox3(false)
          setSuccess(true)
          navigate("/teacherDashboard")
        }
        else{
          setSuccess(false)
          navigate("/teacherDashboard")
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here.
      }   
    }
  }
  
  return (
    <div className="table-container">
        <h3>Your Details</h3>
        {success? <div className="success-message">Updated Successfully</div>:<></>}
    
<table>
    

   <tbody>
     <tr>
       <td>Name : </td>
       <td>{teacher.name}</td>
       
     </tr>
     <tr>
       <td>Dob : </td>
       <td>{moment(teacher.dob).utc().format("DD/MM/YYYY")}</td>
     
     </tr>
     <tr>
       <td>Subjects :</td>
       <td>{teacher.subject1},{teacher.subject2}</td>
      
     </tr>
     
       
       {textBox1 ?
       (
        <tr>
        <td>Phone Number :</td>
        <td><input type="number" defaultValue={contactNo} onChange={(e) => checkPhoneNo(e.target.value)}></input></td>
        {phoneError ? <div className="error">Please enter a valid phone number</div> :<></> }
        <td><button className="edit" onClick={(e) => handleEdit(e)}>Save</button></td>
        </tr>
       )
       :(
        <tr>
        <td>Phone Number :</td>
       <td>{teacher.contactNo}</td>
        <td><button className="edit" onClick={(e) => setTextBox1(true)}>Edit</button></td>
        </tr>
       ) }
      
      {textBox2 ?
       (
        <tr>
        <td>Email :</td>
        <td><input type="text" defaultValue={email} onChange={(e) => checkEmail(e.target.value)}></input></td>
        {emailError ? <div className="error">Please enter a valid email id</div> :<></> }
        <td><button className="edit" onClick={(e) => handleEdit(e)}>Save</button></td>
        </tr>
       ):(
     <tr>
       <td>Email id :</td>
       <td>{teacher.email}</td>
       <td><button className="edit" onClick={(e) => setTextBox2(true)}>Edit</button></td> 
       
     </tr>
       )}
       {textBox3 ?(
        <tr>
     <tr>
       <td>Address :</td>
    </tr>
    <tr>
        <td>Address Line1 :</td>
       <td><input type="text" value={address.addressLine1} onChange={(e) => setAddress({...address,addressLine1:e.target.value})}></input></td></tr>
       <tr>
       <td>Address Line2 :</td>
       <td><input type="text" value={address.addressLine2} onChange={(e) => setAddress({...address,addressLine2:e.target.value})}></input></td>
       </tr>
       <tr>
       <td>City :</td>
       <td><input type="text" value={address.city} onChange={(e) => setAddress({...address,city:e.target.value})}></input></td>
       </tr>
       <tr>
       <td>State:</td>
       <td><input type="text" value={address.state} onChange={(e) => setAddress({...address,state:e.target.value})}></input></td>
       </tr>
       <tr>
       <td>Pin code :</td>
       <td><input type="number" value={address.pincode} onChange={(e) => setAddress({...address,pincode:e.target.value})}></input></td>
       </tr>
       <td><button className="edit" onClick={(e) => handleEdit(e)}>Save</button></td> 
       
     </tr>):(
        <tr>
        <td>Address :</td>
        <td>{teacher.address.addressLine1}<br></br>
        {teacher.address.addressLine2}<br></br>
        {teacher.address.city}<br></br>
        {teacher.address.state}<br></br>
        {teacher.address.pincode}<br></br>
        </td>
        <td><button className="edit" onClick={(e) => setTextBox3(true)}>Edit</button></td> 
        
      </tr>

     )
    }
  </tbody>
</table>
</div>
  )
};

export default TeacherProfile;
