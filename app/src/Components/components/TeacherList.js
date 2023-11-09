import React from "react"


const TeacherList = ({teacherList,subject,grade,getTeacher}) => {

  
  return (
    <div>
        {console.log(teacherList,subject)}
        <select
                        id="teacher"
                        name="teacher"
                        disabled={!teacherList.length}
                        className="dropdown"
                        onChange ={e => getTeacher(teacherList.find((teacher) => teacher.name === e.target.value)._id)}
                      >
                        <option value="" />
                        {teacherList.map((teacher, tkey) => {
                          if (subject.subjectName === teacher.subject1 || subject.subjectName === teacher.subject2) {
                            return (
                              <option key={tkey} value={teacher.name} >
                                {teacher.name}
                              </option>
                            );
                          }
                          return null;
                        })}
                      </select>
    </div>
  )
};

export default TeacherList;
