import React from 'react';
import moment from 'moment';

const AttendanceTable = ({ attendanceData, recordsPerPage, currentPage }) => {
  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  // Sort the attendanceData in reverse chronological order (newest to oldest)
  const sortedData = [...attendanceData].sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentData = sortedData.slice(startIndex, endIndex);

  return (
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((record, index) => (
          <tr key={index}>
            <td>{record.subject}</td>
            <td>{moment(record.date).utc().format("DD/MM/YYYY")}</td>
            <td>{record.attendance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
