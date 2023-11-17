import { Router } from "express";

import getStudentByGrade from "./getStudentByGrade.js";
import getSubjectsByGrade from "./getSubjectsByGrade.js";
import getGradesByTeacher from "./getGradesByTeacher.js";
import fetchMessages from "./fetchMessages.js";
import getTeacherByGrade from "./getTeacherByGrade.js";
import getTeacher from "../teacher/getTeacher.js";
import fetchAttendance from "./fetchAttendance.js";
import fetchAttendanceBySubject from "./fetchAttendanceBySubject.js";


const router = Router();

router
    .get("/studentsByGrade/:grade",getStudentByGrade);
router
    .get("/subjectsByGrade/:grade",getSubjectsByGrade);
router
    .get("/getGradesByTeacher/:id",getGradesByTeacher);
router
    .get("/fetchMessages/:sender/:receiver",fetchMessages);
router
    .get("/getTeacherByGrade/:grade",getTeacherByGrade);
router
    .get("/fetchAttendance/:admissionNo",fetchAttendance);
router
    .get("/fetchAttendanceBySubject/:admissionNo/:subject",fetchAttendanceBySubject);
    


export default router;