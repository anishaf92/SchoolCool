import React,{useEffect,useState} from "react";
import TeacherList from "../components/TeacherList";
import {useSelector} from "react-redux";


const AssignTeacher = () => {
  const token = useSelector((state) => state.admin.token);
    // eslint-disable-next-line
    const [subject,setSubject] = useState("")
    // eslint-disable-next-line
    const [teacherName, setTeacherName] = useState("")
    // eslint-disable-next-line
    const [grade,setGrade] = useState(1)
    const [subjectList,setSubjectList] = useState([])
    const [teacherList,setTeacherList] = useState([])
    const [teacher,setTeacher] = useState(0)
    const [refresh,setRefresh] = useState(true)
    const grades = [1,2,3,4,5,6,7,8,9,10]
    
    const getSubjects = async () => {
        await fetch("http://localhost:6969/admin/getsubjects")
        .then((response) =>{
          console.log(response)
          return response.json();
          }).then(data => setSubjectList(data)) 
    } 
    const getTeachers = async () => {
        await fetch("http://localhost:6969/teacher/getteachers")
        .then((response) =>{
          console.log(response)
          return response.json();
          }).then(data => {
            console.log(data)
            setTeacherList(data)
          }) 
    } 
    
    useEffect(() => {
        getSubjects();
        getTeachers();
        console.log(teacherList)
       // eslint-disable-next-line
    },[refresh]);
    function getTeacher(id){
        setTeacher(id)
        
    }
    const updateTeacherData = async (id) =>{
      console.log("inside update",id,teacher)
      await fetch(`http://localhost:6969/teacher/updateTeacher/${teacher}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({subjectId:id})})
        .then((response) =>{
          console.log(response)
          if(response.status === 200){
            setRefresh(!refresh)
          }
          
          })

    }
    const assignTeacher = async (id) => {
      await fetch("http://localhost:6969/teacher/update", {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({id:id,teacher:teacher})})
        .then((response) =>{
          console.log(response)
          if(response.status === 200){
            console.log("Succesfull")
            updateTeacherData(id)
          }
          
          })

    }
    const updateSubjectTeacher = (grade, subjectName) => {
      const updatedSubjectList = [...subjectList]; // Create a copy of the current subjectList
      const subjectToUpdate = updatedSubjectList.find((subject) => subject.grade === grade && subject.subjectName === subjectName);
    
      if (subjectToUpdate) {
        subjectToUpdate.teacher = null; // Set the teacher to null for the specified subject
        setSubjectList(updatedSubjectList); // Update the subjectList state
      }
    };
    
    
    
    return (
        <div className="table-container-assign">
          <h4>Assign Teacher</h4>
          {grades.map((grade, key) => (
            <div key={key}>
              <h5>Grade {grade}</h5>
              {subjectList.map((subject, skey) => (
                subject.grade === grade ? (
                  <span className="center" key={skey}>
                    <strong>Subject Name: {subject.subjectName}</strong><br />
                    <strong>Teacher Name: </strong> {subject.teacher === null ? (
                      <div>
                      <label htmlFor="teacher">Please Select a Teacher
                      <TeacherList teacherList={teacherList} subject={subject} getTeacher={(id) => getTeacher(id)} />
                      </label>
                      <button onClick={() => assignTeacher(subject._id)}>Assign</button>
                      </div>
                      
                    ) : (
                      <div>
                      <div> {teacherList.find((teacher) => teacher._id === subject.teacher)?.name}</div>
                      <button onClick={() => updateSubjectTeacher(grade, subject.subjectName)}>Change Teacher</button>

                      </div>
                    )}
                  </span>
                ) : null
              ))}
            </div>
          ))}
          
        </div>
      );
      
         
};

export default AssignTeacher;
