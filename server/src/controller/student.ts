import { IStudentCreate } from '../interface/student';
import {  studentModel } from '../model/student'
import { Request, Response,NextFunction } from 'express'
import { authServices } from '../services/auth';
import { Message } from '../utils/message';
import { authModel } from '../model/auth';
import { s3 } from '../services/amazon';
import { subjectModel } from '../model/subject';

class studentController {

    create = async (req : any, res : Response, next : NextFunction) => {
        const body : IStudentCreate = req.body
        const avatar : string = req.file.location
        const defaultPassword = '123'
        const defaultId = '00000'
        const char = await subjectModel.getDetailMajor(body.major as unknown as number)
        const year  = new Date().getFullYear().toString().slice(2,4)
        const starId = year + "1" +char
        const studentLast = await studentModel.getLastByMajor(body.major as unknown as number)
        const idLast = studentLast ? parseInt(studentLast.toString().slice(5,10)) + 1 : defaultId
        const idLastCenter = studentLast ? defaultId.slice(0,defaultId.length  - idLast.toString().length) : ""

        console.log('starId', starId);
        console.log('idLast', idLast);
        console.log('idLastCenter', idLastCenter);

        const newEmailId = starId + idLastCenter + idLast        

        console.log('newEmailId', newEmailId);

        const student = await authServices.verifyEmai(newEmailId)
        const passwordHash = await authServices.hashPassword(defaultPassword)
        if(student){
            await s3.deleteObject({
                Bucket: 'vhuportal',
                Key:  req.file.key
              },function (err: any,data: any){})
           return res.status(200).json({
                result: false,
                data: Message.emailExist,
            });
        }
        const insertId = await studentModel.create({...body, email: newEmailId, password :passwordHash!, avatar : avatar }); // ! NEVER UNDEFINED
        if (insertId > 0) {
            res.status(200).json({
                result: true,
                data: Message.createStudentSuccess
            });
        }
    }

    getAll = async (req : any, res : Response, next : NextFunction) => {
        try {
            const data = await studentModel.getAll();
            if (data) {
                res.status(200).json({
                    result: true,
                    data: data
                });
            }
        } catch (error) {
            res.status(200).json({
                result: false,
                data: null
            });
        }
      
    }
    getAllTeacher = async (req : any, res : Response, next : NextFunction) => {
        try {
            const data = await studentModel.getAllTeacher();
            if (data) {
                res.status(200).json({
                    result: true,
                    data: data
                });
            }
        } catch (error) {
            res.status(200).json({
                result: false,
                data: null
            });
        }
      
    }
    
    getDetail = async (req : any, res : Response, next : NextFunction) => {
        try {
            const email : string = req.params.id
            const data = await studentModel.getDetail(email);

            if (data) {
                res.status(200).json({
                    result: true,
                    data: data
                });
            }
        } catch (error) {
            res.status(200).json({
                result: false,
                data: null
            });
        }
      
    }
}
export const StudentController = new studentController()
