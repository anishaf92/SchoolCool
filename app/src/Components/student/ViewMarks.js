import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart"; 
import { persistor } from '../../app/store';
import {useNavigate} from "react-router-dom";

const ViewMarks = (props) => {
  const exams = ["midTerm1", "midTerm2", "midTerm3", "quarterly", "halfYearly", "finalExam"];
  const [display, setDisplay] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [subjects,setSubjects] =  useState([])
  const navigate = useNavigate();
  const student = useSelector((state) => state.student.student);
  const token = useSelector((state) => state.student.token);
  const getSubjectsByGrade = async () => {
    await fetch(`http://localhost:6969/api/subjectsByGrade/${student.grade}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const subjectNames = data.subjectList.map((subject) => subject.subjectName);
        console.log(subjectNames)
        setSubjects(subjectNames);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }
  
  useEffect(() => {
    getSubjectsByGrade();
  },[])
  
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  return (
    <div>
      <div className="table-container-marks">
        {exams.map((exam, key) => (
          student.marks[exam].length > 0 ? (
            <table key={key}>
              <tbody>
                <tr>
                  <td>{exam.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>
                    <table className="sub-table">
                      <tbody>
                        {student.marks[exam].map((subject, subjectKey) => (
                          <div key={subjectKey}>
                            <tr>
                              <td className="sub-td">{subject.subject}</td>
                              <td className="sub-td">{subject.mark}</td>
                            </tr>
                          </div>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : <></>
        ))}
      </div>
      <div className="table-container visual">
        <div className="input-parent">
          <label htmlFor="radio">Do you want to visualize by? </label>
          <div className="gen-buttons">
            <input
              type="radio"
              name="radio"
              id="radio1"
              value="Exam"
              onChange={() => setDisplay("exam")}
            />
            <label htmlFor="radio1" className="radio-label">Exam</label>
          </div>
          <div className="gen-buttons">
            <input
              type="radio"
              name="radio"
              id="radio2"
              value="Subject"
              onChange={() => setDisplay("subject")}
            />
            <label htmlFor="radio2">Subject</label>
          </div>
          {display === "exam" && (
            <div className="exam-dropdown">
              <label htmlFor="examSelect">Select an exam: </label>
              <select
                id="examSelect"
                value={selectedExam}
                onChange={handleExamChange}
              >
                <option value="">Select an exam</option>
                {exams.map((exam, key) => (
                  <option key={key} value={exam}>
                    {exam.toUpperCase()}
                  </option>
                ))}
              </select>
              {selectedExam && student.marks[selectedExam].length > 0 ? (
                <BarChart data={student.marks[selectedExam]} />
              ) : (
                <p>Marks not uploaded yet for this exam.</p>
              )}
            </div>
          )}
{display === "subject" && (
  <div className="subject-dropdown">
    <label htmlFor="subjectSelect">Select a subject: </label>
    <select
      id="subjectSelect"
      value={selectedSubject}
      onChange={handleSubjectChange}
    >
      <option value="">Select a subject</option>
      {subjects.map((subject, subjectKey) => (
        <option key={subjectKey} value={subject}>
          {subject}
        </option>
      ))}
    </select>
    {selectedSubject && (
      <LineChart
        marksData={student.marks} // Pass all marks data
        selectedSubject={selectedSubject}
        exams={exams}
      />
    )}
  </div>
)}



    
        </div>
      </div>
    </div>
  );
};

export default ViewMarks;
