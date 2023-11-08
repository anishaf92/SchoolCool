import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import moment from "moment";


const StudentProfile = () => {
  const student = useSelector((state) => state.student.student);
  const token = useSelector((state) => state.student.token);
  const navigate = useNavigate();
  
  return (
    <div className="table-container">
        <h3>Your Details</h3>
    
<table>

   <tbody>
     <tr>
       <td>Name : </td>
       <td>{student.name}</td>
       
     </tr>
     <tr>
       <td>Dob : </td>
       <td>{moment(student.dob).utc().format("DD/MM/YYYY")}</td>
     
     </tr>
     <tr>
       <td>Grade :</td>
       <td>{student.grade}</td>
      
     </tr>
     <tr>
       <td>Parent Phone No :</td>
       <td>{student.parentNo}</td>
       {/* <td><button className="edit">Edit</button></td> */}
      
     </tr>
     <tr>
       <td>Parent Email id :</td>
       <td>{student.parentEmail}</td>
       {/* <td><button className="edit">Edit</button></td> */}
       
     </tr>
     <tr>
       <td>Address :</td>
       <td>{student.address.addressLine1}<br></br>
       {student.address.addressLine2}<br></br>
       {student.address.city}<br></br>
       {student.address.state}<br></br>
       {student.address.pincode}<br></br>
       </td>
       {/* <td><button className="edit">Edit</button></td> */}
       
     </tr>
  </tbody>
</table>
</div>
  )
};

export default StudentProfile;
