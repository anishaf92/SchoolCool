import { Router } from "express";
import login from "./login.js";
import register from "./register.js";
import verify from "./verify.js";
import getDetails from "./getDetails.js";
const router = Router();
router
  .route("/login")
  .post(login);
router
  .route("/register")
  .post(register);
router
  .route("/verify")
  .post(verify);
router
  .get("/getDetails/:admissionNo",getDetails)
export default router;