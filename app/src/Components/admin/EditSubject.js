import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const EditSubject = () => {
  const admin = useSelector((state) => state.admin.admin);
  const token = useSelector((state) => state.admin.token);
  const [subject,setSubject] = useState("")
  const [grade,setGrade] = useState("")
  const [subjectList,setSubjectList] = useState([])
  const [refresh, setRefresh] = useState(false);
  const grades = [1,2,3,4,5,6,7,8,9,10]
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("http://localhost:6969/admin/getsubjects")
    .then((response) =>{
      console.log(response)
      return response.json();
      }).then(data => setSubjectList(data))

    
  },[refresh]);
  const addSubject = async () => {
    await fetch("http://localhost:6969/admin/addsubject", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({subjectName:subject,grade:grade})
      }).then((response) =>{
      console.log(response)
      return response.json();
      }).then(data => {
        setRefresh(!refresh)
        setSubject("");
        setGrade("")
      })


  }
  const handleSubjectDelete = async(id) =>{
    await fetch(`http://localhost:6969/admin/deletesubject/${id}`,{
      method:'DELETE',
      header:{'Authorization': `${token}`}
    })
    .then((response)=> console.log(response) )
    .then((data) => setRefresh(!refresh))

  }

  return (
    <div className="table-container-announcement"> 
    <table>
      <tr>
        <label htmlFor="subject">Enter Subject: </label>     
        <input type = "text" className="subject-input" id="subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} />
      </tr>
      <tr>
        <label htmlFor="grade">
                  Grade
           <select id="grade" name="grade" disabled={!grades.length} 
                value={grade}  
                onChange={e=>setGrade(e.target.value)}>
                 <option value="" />
                    {grades.map((grade,key) => (
                          <option value={grade}>{grade}</option>
                          ))
                          }
    
                </select>
              
              
              </label>
              </tr>
              <tr>
            
        <button onClick={e => addSubject()}>Add Subject </button>
        </tr>
        </table>
        <div>
        <h4 className="center">Subjects</h4>
        {grades.map((grade, key) => (
  <div className="table-container-announcement" key={key}>
    <h5>Grade {grade}</h5>
    <table>
     
    {subjectList.map((subject, skey) => (
      subject.grade === grade ? (
        <tr>
          <td>
        <div key={skey}>{subject.subjectName}</div>
        </td>
        <td>
        <button className ="normal" onClick ={e => handleSubjectDelete(subject._id)}> Delete</button>
        </td>
        </tr>
      ) : null
    ))}
    
    </table>
  </div>
))}


                          

        </div>
    </div>
  )
};

export default EditSubject;
