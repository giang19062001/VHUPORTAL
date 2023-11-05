
import { Request, Response,NextFunction } from 'express'
import { subjectModel } from '../model/subject';

class subjectController {

    getDetail = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : number = req.params.id
            const data = await subjectModel.getAllByMajor(id);

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
    getAll = async (req : any, res : Response, next : NextFunction) => {
        try {
            const data = await subjectModel.getAll()

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
    getAllMajor = async (req : any, res : Response, next : NextFunction) => {
        try {
            const data = await subjectModel.getAllMajor()

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
export const SubjectController = new subjectController()
