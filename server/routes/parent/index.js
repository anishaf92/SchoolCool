import { Router } from "express";
import register from "./register.js";
import login from "./login.js";
const router = Router();
router
  .route("/login")
  .post(login);
router
  .route("/register")
  .post(register);
router
  .patch("/update/:admissionNo")
export default router;