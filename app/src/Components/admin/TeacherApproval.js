import React, { useEffect ,useState} from "react";
import { useSelector  } from "react-redux";


const TeacherApproval = () => {

  const token = useSelector((state) => state.admin.token);
    const [pendingApprovals,setPendingApprovals] = useState([]);
    const [result,setResult] = useState(false);
  
    
    useEffect(() =>{
        fetch('http://localhost:6969/admin/teacherapproval')
        .then(response => {return response.json()})
        .then((data)=> setPendingApprovals(data))
    },[result]);
    const handleApproval = (id) =>{
      console.log(id,token)
      fetch(`http://localhost:6969/admin/approveteacher/${id}`,{
        method: 'GET',
        headers:{'Authorization': `${token}`}
      })
        .then(response => {return response.json()})
        .then((data)=> {
          if(data.result === "Success"){
            setResult(true)
          }
        })
    }
    const handleDelete = (id) =>{
      console.log(id)
      fetch(`http://localhost:6969/admin/deleteteacher/${id}`,{
        method: 'DELETE',
        headers:{'Authorization': `${token}`}
        })
        .then(response => {return response.json()})
        .then((data)=> {
          if(data.result === "Success"){
            console.log(data)
            setResult(true)
          }
        })
    }
  return (
      <div className="scroll">
         {pendingApprovals.length === 0 ? (
        <h4>You dont have any teacher profiles for approval</h4>
        )
        :(
      <table>
        <thead>
            <th>Name</th>
            <th>Employee No</th>
            <th>Gender</th>
            <th>Phone no</th>
            <th>Email</th>
            <th>Subjects</th>
        </thead>
          {pendingApprovals.length !== 0 ? (
            pendingApprovals.map((teacher,key) => (
              <tr>
              <td>{teacher.name}</td>
              <td>{teacher.empNo}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.contactNo}</td>
              <td>{teacher.email}</td>
              <td>{teacher.subject1},{teacher.subject2}</td>
              <td><button onClick={e => handleApproval(teacher._id)}>Approve</button></td>
              <td><button onClick={e => handleDelete(teacher._id)}>Delete</button></td>
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

export default TeacherApproval;
