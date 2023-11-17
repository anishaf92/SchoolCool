import { Router } from "express";
import login from "./login.js";
import register from "./register.js";
import uniqueSubjects from "./uniqueSubjects.js";
import getTeachers from "./getTeachers.js";
import updateSubject from "./updateSubject.js";
import updateTeacher from "./updateTeacher.js";
import updateTeacherInfo from "./updateTeacherInfo.js";
import getTeacher from "./getTeacher.js";
import getSubjectByTeacher from "./getSubjectByTeacher.js";
import updateMarks from "./updateMarks.js";
import updateAttendance from "./updateAttendance.js"
import { verifyToken } from "../../controllers/teacher.js";
import { verifyAdminToken } from "../../controllers/admin.js";
const router = Router();
router
  .route("/login")
  .post(login);
router
  .route("/register")
  .post(register);
router
  .get("/getuniquesubjects", uniqueSubjects);
router
  .get("/getteachers", getTeachers);
router
  .patch("/update",verifyAdminToken,updateSubject);

router
  .route("/updateTeacher/:id")
  .patch(updateTeacher);
router
  .patch("/updateInfo/:id",verifyToken, updateTeacherInfo);
router
  .get("/get/:id",getTeacher)
router
  .post("/getSubjects",getSubjectByTeacher)
router
  .post("/updateMarks",verifyToken,updateMarks)

router
  .post("/updateAttendance",verifyToken,updateAttendance)
export default router;