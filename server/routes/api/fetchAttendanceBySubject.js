import { fetchAttendanceBySubject } from "../../controllers/student.js";

export default async (req, res) => {
    try {
        const admissionNo = req.params.admissionNo;
        const subject = req.params.subject;
        console.log(subject)
        const attendanceData = await fetchAttendanceBySubject(admissionNo,subject);
    
        // Calculate total count of attendance records
        const totalCount = attendanceData.length;
    
        // Calculate count of "present" attendance records
        const presentCount = attendanceData.filter(record => record.attendance === 'present').length;
    
        res.json({ attendanceData, totalCount, presentCount });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attendance data' });
      }

};