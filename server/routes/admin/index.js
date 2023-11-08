import { Router } from "express";
import home from "./home.js";
import login from "./login.js";
import dashboard from "./studentApproval.js";
import register from "./register.js";
import studentApproval from "./studentApproval.js";
import approveStudent from "./approveStudent.js";
import approveTeacher from "./approveTeacher.js";
import teacherApproval from "./teacherApproval.js";
import announce from "./announce.js";
import getAnnouncements from "./get-announcements.js";
import deleteTeacher from "./deleteTeacher.js";
import deleteStudent from "./deleteStudent.js";
import addSubject from "./addSubject.js";
import getSubjects from "./get-subjects.js";
import deleteSubject from "./deleteSubject.js";
import deleteAnnouncement from "./deleteAnnouncement.js";
import  {verifyAdminToken}  from "../../controllers/admin.js";



const router = Router();


router
  .route("/login")
  .post(login);
router
  .route("/register")
  .post(register);
router
  .get("/studentapproval",  studentApproval);
router
  .get("/teacherapproval" , teacherApproval);
router
  .get("/approvestudent/:id", verifyAdminToken,approveStudent);
router
  .delete("/deletestudent/:id",verifyAdminToken, deleteStudent);
router
  .get("/approveteacher/:id", verifyAdminToken , approveTeacher);
router
  .delete("/deleteteacher/:id", verifyAdminToken , deleteTeacher);
router
  .post("/announcement", verifyAdminToken, announce);
router
  .get("/getannouncements", getAnnouncements);
router
  .post("/addsubject", verifyAdminToken , addSubject);

router
  .get("/getsubjects", getSubjects);
router
  .delete("/deletesubject/:id", deleteSubject);
router
  .delete("/deleteAnnouncement/:id", deleteAnnouncement);






export default router;
