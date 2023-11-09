import React,{useEffect,useState} from "react";
import { useSelector } from 'react-redux';
import "../../Css/dashboard.css"


const Marks = () => {
  const teacher = useSelector((state) => state.teacher.teacher);
  const token = useSelector((state) => state.teacher.token);
  const [subjects,setSubjects] = useState([]);
  const [studentsList,setStudentsList] = useState([])
  const [listMode,setListMode] = useState(false);
  const [selectedSubject,setSelectedSubject] = useState("")
  const [marks, setMarks] = useState({});
  const [grade, setGrade] = useState(0);
  const [selectedExam, setSelectedExam] = useState("")
  const [success,setSuccess] = useState(false)
  const exams = ["midTerm1","midTerm2","midTerm3","quarterly","halfYearly","finalExam"]; 
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

    })

}
const handleMarkChange = (studentId, value) => {
    setMarks({
      ...marks,
      [studentId]: value,
    });
    console.log(marks)
  };

  // Function to send marks to the backend
  const updateMarks = async () => {
    console.log(selectedSubject)
    const marksData = {
      exam:selectedExam,
      subject: selectedSubject,
      marks: marks,
    };

    try {
      const response = await fetch("http://localhost:6969/teacher/updateMarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`
            },
        body: JSON.stringify(marksData),
      });

      if (!response.ok) {
        console.log("error")
      } else {
        console.log("Success")
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
          <td>Exam</td>
          <td >
            <select className="dropdown" id="exam" name="exam" onChange={(e) => setSelectedExam(e.target.value)} >
              <option value="">Exam</option>
              {exams.map((exam,key) => (
                <option value={exam}>{exam.toUpperCase()}</option>
              ))}
            </select>
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
                <td >Marks</td>
            </tr>
            {studentsList && studentsList.map((student,key) => (
                <tr>
                    <td>{student.admissionNo}</td>
                    <td>{student.name}</td>
                    <td>
                      <input
                      type="number"
                      min={0}
                      max={100}
                      value={marks[student._id] || ""} 
                      onChange={(e) => handleMarkChange(student._id, e.target.value)} 
                     />
                    </td>
                </tr>
            ))}
           
        </table>
        <button onClick={updateMarks}>Update Marks</button>

    </div>)
    :<></>}
    </div>

  );
};



export default Marks;
