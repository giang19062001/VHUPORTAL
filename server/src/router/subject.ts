import { SubjectController } from "../controller/subject";

var express = require('express');

export const routerSubject = express.Router()


routerSubject.post('/getAll', SubjectController.getAll);
routerSubject.post('/major/getAll', SubjectController.getAllMajor);



