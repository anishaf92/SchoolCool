import express from 'express';
// const express = require("express");
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import bcrypt from "bcrypt";
import admin from "./routes/admin/index.js"
import student from "./routes/student/index.js"
import teacher from "./routes/teacher/index.js"
import Subject from './models/subject.js';
import api from "./routes/api/index.js";
import parent from "./routes/parent/index.js"
import home from "./routes/home/index.js"
import http from 'http'; // Import the HTTP module


dotenv.config();

const app = express ();
const server = http.createServer(app);
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST','PATCH','DELETE'],
};


const PORT  =  6969;
app.use(cors(corsOptions));

app.use (express.urlencoded ({extended: true}));
app.use (express.json ());

const dbURL = process.env.mongodbURL;
mongoose.connect(dbURL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

//Adding basic subjects


//routes routes
app.use("/student", student);
app.use("/admin", admin);
app.use("/teacher", teacher);
app.use("/api", api);
app.use("/parent", parent);
app.use("/",home)




server.listen(PORT, () => {
  console.log ('listening',PORT);
})




