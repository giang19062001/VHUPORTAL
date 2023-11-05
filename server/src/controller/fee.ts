
import { Request, Response,NextFunction } from 'express'
import { teachModel } from '../model/teach';
import { IPayPost } from '../interface/fee';
import { feeModel } from '../model/fee';
import { Message } from '../utils/message';

class feeController {
    pay = async (req : any, res : Response, next : NextFunction) => {
        try {
            const body : IPayPost = req.body
            const data = await feeModel.pay(body)

            if (data) {
                res.status(200).json({
                    result: true,
                    data: Message.paySuccess
                });
            }
        } catch (error) {
            res.status(200).json({
                result: false,
                data: null
            });
        }
      
    }
    getFee = async (req : any, res : Response, next : NextFunction) => {
        try {
            const id : string = req.params.id

            const data = await feeModel.getFee(id)

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
    getAllFee = async (req : any, res : Response, next : NextFunction) => {
        try {

            const data = await feeModel.getAllFee()
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
export const FeeController = new feeController()
