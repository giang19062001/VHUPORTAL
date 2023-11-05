var express = require('express');
import { StudentController } from '../controller/student'
import { authMiddleware } from '../middleware/auth';
export const routerStudent = express.Router()
const uploadS3 = require("../middleware/upload");
const validatorStudent = require("../validation/student");

// routerStudent.post('/create',authMiddleware.verifyToken, uploadS3.single("avatar"), validatorStudent.VStudent, StudentController.create);
routerStudent.post('/create', uploadS3.single("avatar"), validatorStudent.VStudent, StudentController.create);
routerStudent.post('/getAll',  StudentController.getAll);
routerStudent.post('/getDetail/:id',  StudentController.getDetail);

//TEACHER
routerStudent.post('/teacher/getAll',  StudentController.getAllTeacher);



