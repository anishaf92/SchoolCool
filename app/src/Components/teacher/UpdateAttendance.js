import React,{useEffect,useState} from "react";
import { useSelector } from 'react-redux';

const UpdateAttendance = (props) => {
    const teacher = useSelector((state) => state.teacher.teacher);
    const token = useSelector((state) => state.teacher.token);
    const [subjects,setSubjects] = useState([]);
    const [studentsList,setStudentsList] = useState([])
    const [listMode,setListMode] = useState(false);
    const [selectedSubject,setSelectedSubject] = useState("")
    const [date, setDate] = useState("");
    const [attendanceData, setAttendanceData] = useState([])
    const [grade, setGrade] = useState(0);
    const [success,setSuccess] = useState(false)
    const getSubjects = async () =>{
    await fetch("http://localhost:6969/teacher/getSubjects", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: teacher.subjectId }), 
  })
      .then((response) => {
          return response.json()
      })
      .then((data) =>{
          console.log(data)
          setSubjects(data.subjects)
      })
  }
  const getStudentsList = async () => {
      await fetch(`http://localhost:6969/api/studentsByGrade/${grade}`)
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          console.log(data)
          setStudentsList(data.studentList)
          setListMode(true)
          setSuccess(false)
  
      })
  
  }
  
    
    const updateAttendance = async () => {

      try {
        const response = await fetch("http://localhost:6969/teacher/updateAttendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`
              },
          body: JSON.stringify({subject:selectedSubject,grade:grade,date:date,attended:attendanceData}),
        });
  
        if (!response.ok) {
          console.log("error")
        } else {
          console.log("Success")
          setAttendanceData([])
          setListMode(false)
          setSuccess(true);
        }
      } catch (error) {
        // Handle the error here
      }
    };
  useEffect (() =>{
      
      getSubjects();
      // eslint-disable-next-line
    },[]);
    return (
      <div>
      
      <div className="table-container">
        <table >
          <tr >
          <td >Grade</td>  
            <td >
              <select
                id="grade"
                name="grade"
                className="dropdown"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">Grade</option>
                {Array.from(new Set(subjects.map((subject) => subject.grade)).values()).map((grade, key) => (
                  <option key={key} value={grade}>
                    {grade}
                  </option>
                )
              )}
              </select>
            </td>
            </tr>
            <tr>
            <td>Subject</td>
            <td >
              <select className="dropdown" id="subject" name="subject" onChange={(e) => setSelectedSubject(e.target.value)} >
                <option value="">Subject</option>
                {subjects
                  .filter((subject) => subject.grade === parseInt(grade))
                  .map((filteredSubject, key) => (
  
                    <option key={key} value={filteredSubject.subjectName}  >
                      {filteredSubject.subjectName}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Date</td>
            <td >
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                
                            </td>
          </tr>
        </table>
        <button onClick={() => getStudentsList()}>Get Students List</button>
      </div>
      {success? <div className="success-message">Updated Successfully</div>:<></>}
      {listMode ?(
      <div className="table-container">
          <table >
              <tr>
                  <td >Admission No</td>
                  <td >Student Name</td>
                  <td >Attendance</td>
              </tr>
              {studentsList && studentsList.map((student,key) => (
                  <tr>
                      <td>{student.admissionNo}</td>
                      <td>{student.name}</td>
                      <td>
                      <div className="input-parent">
      
      <div className="gen-buttons">
    <input type="radio" name={`radio-${student.admissionNo}`}
              id={`radio1-${student.admissionNo}`} value="present" onChange={(e) => setAttendanceData([...attendanceData, {admissionNo:student.admissionNo,attendance:e.target.value}]) } required/>
    <label htmlFor="radio1" className="radio-label">Present</label>
    </div>
    <div className="gen-buttons">
    <input type="radio" name={`radio-${student.admissionNo}`}
              id={`radio1-${student.admissionNo}`} value="absent" onChange={(e) => setAttendanceData([...attendanceData, {admissionNo:student.admissionNo,attendance:e.target.value}])}  required/>
    <label htmlFor="radio2">Absent</label>
    </div>
    
    </div>
                      </td>
                  </tr>
              ))}
             
          </table>
          <button onClick={updateAttendance}>Update Attendance</button>
  
      </div>)
      :<></>}
      </div>
  
    );
};

export default UpdateAttendance;
