import React, { useEffect ,useState} from "react";
import { useSelector } from "react-redux";



const StudentApproval = () => {
    const [pendingApprovals,setPendingApprovals] = useState([])
    const [result,setResult] = useState(false)
    const admin = useSelector((state) => state.admin.admin);
    const token = useSelector((state) => state.admin.token);
   
    
    useEffect(() =>{
        console.log(admin,token)
        fetch('http://localhost:6969/admin/studentapproval',)
        .then(response => {return response.json()})
        .then((data)=> setPendingApprovals(data))
        // eslint-disable-next-line
    },[result]);
    const handleApproval = (id) =>{
      console.log(id)
      fetch(`http://localhost:6969/admin/approvestudent/${id}`,
      {
        headers:{"Authorization" : `${token}`}
      }
      )
        .then(response => {return response.json()})
        .then((data)=> {
          if(data.result === "Success"){
            setResult(true)
          }
        })
    }
    const handleDelete = (id) =>{
      console.log(id,token)
      fetch(`http://localhost:6969/admin/deletestudent/${id}`,{
        method: 'DELETE',
        headers:{'Authorization': `${token}`}
        })
        .then(response => {return response.json()})
        .then((data)=> {
          if(data.result === "Success"){
            setResult(true)
          }
        })
    }
  return (
     
      <div className="scroll">
        {pendingApprovals.length === 0 ? (
        <h4>You dont have any student profiles for approval</h4>
        )
        :(
      <table>
        <tr>
            <th>Name</th>
            <th>Admission No</th>
            <th>Gender</th>
            <th>Parent Name</th>
            <th>Parent No</th>
            <th>Parent Email</th>
            <th>Approve</th>
            <th>Delete</th>
        </tr>
          {pendingApprovals.length !== 0 ? (
           pendingApprovals && pendingApprovals.map((student,key) => (
              <tr>
              <td>{student.name}</td>
              <td>{student.admissionNo}</td>
              <td>{student.gender}</td>
              <td>{student.parentName}</td>
              <td>{student.contactNo}</td>
              <td>{student.parentEmail}</td>
              <td><button onClick={e => handleApproval(student._id)}>Approve</button></td>
              <td><button onClick={e => handleDelete(student._id)}>Delete</button></td>
              </tr>
            )))
            :
            <></>
          }
        
        </table>
        )}
        </div>

      
  
  )
};

export default StudentApproval;
