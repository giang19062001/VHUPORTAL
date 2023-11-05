
import { Request, Response,NextFunction } from 'express'
import { teachModel } from '../model/teach';
import { ISignTeachOfTeacherAndSubjectPost, ISignTeachPost } from '../interface/teach';

class teachController {
    getTeachSemeter = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : number = req.params.id

            const data = await teachModel.getTeachSemeter(id)

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
    getSignTeach = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : string = req.params.id

            const data = await teachModel.getSignTeach(id)

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
    getSignTeachOfTeacher = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : number = req.params.id

            const data = await teachModel.getSignTeachOfTeacher(id)

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
    getSignTeachOfTeacherAndSubject = async (req : any, res : Response, next : NextFunction) => {
        try {
            const body : ISignTeachOfTeacherAndSubjectPost = req.body

            const data = await teachModel.getSignTeachOfTeacherAndSubject(body)

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
    deteleSignTeach = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : number = req.params.id

            const data = await teachModel.deteleSignTeach(id)

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
    openSemeter = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : number = req.params.id

            const data = await teachModel.openSemeter(id)

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
    closeSemeter = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : number = req.params.id

            const data = await teachModel.closeSemeter(id)

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
    getSemeter = async (req : any, res : Response, next : NextFunction) => {
        try {

            const data = await teachModel.getSemeter()

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
    signTeach = async (req : any, res : Response, next : NextFunction) => {
        try {
            const body : ISignTeachPost = req.body
            const data = await teachModel.signTeach(body)

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
export const TeachController = new teachController()
