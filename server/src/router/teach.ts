import { TeachController } from "../controller/teach";

var express = require('express');

export const routerTeach = express.Router()


routerTeach.post('/getTeachSemeter/:id', TeachController.getTeachSemeter);
routerTeach.post('/getSignTeach/:id', TeachController.getSignTeach);
routerTeach.post('/getSignTeachOfTeacher/:id', TeachController.getSignTeachOfTeacher);
routerTeach.post('/getSignTeachOfTeacherAndSubject', TeachController.getSignTeachOfTeacherAndSubject);

routerTeach.post('/deteleSignTeach/:id', TeachController.deteleSignTeach);
routerTeach.post('/getSemeter', TeachController.getSemeter);
routerTeach.post('/openSemeter/:id', TeachController.openSemeter);
routerTeach.post('/closeSemeter/:id', TeachController.closeSemeter);
routerTeach.post('/signTeach', TeachController.signTeach);



