import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AttendanceTable from './AttendanceTable';
import {Pie} from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

const CheckAttendance = () => {
  const student = useSelector (state => state.student.student);
  const [chartKey, setChartKey] = useState (0);
  // eslint-disable-next-line
  const [admissionNo, setAdmissionNo] = useState (student.admissionNo);
  // eslint-disable-next-line
  const [grade, setGrade] = useState (student.grade);
  const [attendanceData, setAttendanceData] = useState ([]);
  const [totalCount, setTotalCount] = useState (0);
  const [presentCount, setPresentCount] = useState (0);
  // eslint-disable-next-line
  const [selectedSubject, setSelectedSubject] = useState ('');
  const [showAttendance, setShowAttendance] = useState (false);
  const [subjects, setSubjects] = useState ([]);
  const [currentPage, setCurrentPage] = useState (1);
  const recordsPerPage = 10;
  const url = process.env.REACT_APP_BASE_URL;
  Chart.register(...registerables);
  // Calculate the total number of pages based on recordsPerPage
  const totalPages = Math.ceil (attendanceData.length / recordsPerPage);
 
  // Handle page change
  const handlePageChange = page => {
    setCurrentPage (page);
  };

  const getSubjectsByGrade = async () => {
    await fetch (`${url}/api/subjectsByGrade/${student.grade}`)
      .then (response => {
        return response.json ();
      })
      .then (data => {
        const subjectNames = data.subjectList.map (
          subject => subject.subjectName
        );
        console.log (subjectNames);
        setSubjects (subjectNames);
      })
      .catch (error => {
        console.error ('Error fetching subjects:', error);
      });
  };
  const pieChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [presentCount, totalCount - presentCount],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };
  const handleGetAttendance = async () => {
      console.log(selectedSubject)
      if(selectedSubject === "All"){
        try {
      await fetch (`${url}/api/fetchAttendance/${student.admissionNo}`)
        .then (response => response.json ())
        .then (data => {
          setAttendanceData (data.attendanceData);
          setTotalCount (data.totalCount);
          setPresentCount (data.presentCount);
          setShowAttendance (true);
          setChartKey (prevKey => prevKey + 1);
        });
      }
    catch (error) {
      console.error ('Error fetching attendance', error);
    }}
  
  else{
    try {
    await fetch (`${url}/api/fetchAttendanceBySubject/${student.admissionNo}/${selectedSubject}`)
    .then (response => response.json ())
    .then (data => {
      setAttendanceData (data.attendanceData);
      setTotalCount (data.totalCount);
      setPresentCount (data.presentCount);
      setShowAttendance (true);
      setChartKey (prevKey => prevKey + 1);
    });
} catch (error) {
  console.error ('Error fetching attendance', error);
}
  }
  };

  useEffect (() => {
    getSubjectsByGrade ();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="table-container">
        <h4>Attendance</h4>
        <table>
          <tr>
            <td>Subject</td>
            <td>
              <select
                className="dropdown"
                id="subject"
                name="subject"
                onChange={e => setSelectedSubject(e.target.value)}
              >
                <option value="All">All </option>
                {subjects &&
                  subjects.map((subject, key) => (
                    <option key={key} value={subject}>
                      {subject}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
        </table>
        <button onClick={handleGetAttendance}>Get Attendance</button>
      </div>
      {showAttendance
        ? <div className="table-container">
            <table>
              <tr>
                <td>Total Classes attended</td>
                <td>
                  {presentCount}/{totalCount}
                </td>
              </tr>
            </table>
            <AttendanceTable
              attendanceData={attendanceData}
              recordsPerPage={recordsPerPage}
              currentPage={currentPage}
            />
            <div>
              {/* Render pagination controls */}
              <ul>
                {Array.from ({length: totalPages}, (_, i) => (
                  <li
                    key={i}
                    className={i + 1 === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange (i + 1)}
                  >
                    Page {i + 1}
                  </li>
                ))}
              </ul>
            </div>
            <div >
              <Pie
                key={chartKey}
                data={pieChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right', // Adjust the position of the legend as needed
                      labels: {
                        fontColor: 'black',
                      },
                    },
                  },
                }}
              />

            </div>
          </div>
        : null}
    </div>
  );
};

export default CheckAttendance;
