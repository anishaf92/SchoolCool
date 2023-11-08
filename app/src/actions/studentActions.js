import { createAction } from '@reduxjs/toolkit';

export const loginStudent = createAction('student/loginStudent');

export const verifyStudentToken = createAction('student/verifyStudentToken');

export const logoutStudent = createAction('student/logoutStudent');

