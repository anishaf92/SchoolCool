import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";

const LineChartComponent = ({ marksData, selectedSubject, exams }) => {
  const data = exams.map((exam) => {
    const markData = marksData[exam].find((subject) => subject.subject === selectedSubject);
    return {
      exam: exam,
      mark: markData ? markData.mark : null,
    };
  });

  const filteredData = data.filter((dataPoint) => dataPoint.mark !== null);

  if (filteredData.length === 0) {
    return <div>Marks not uploaded yet for this subject in any exam.</div>;
  }

  return (
    <LineChart width={400} height={300} data={filteredData}>
      <XAxis dataKey="exam">
        <Label value="Exam" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label angle={-90} position="insideLeft" />
      </YAxis>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend content={null} />
      <Line type="monotone" dataKey="mark" name="Marks" stroke="#8884d8" />
    </LineChart>
    
  );
};

export default LineChartComponent;
