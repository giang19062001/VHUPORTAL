import {  validationResult, body } from "express-validator";
import { NextFunction, Response, Request } from "express";
import { s3 } from "../services/amazon";
import { Message } from "../utils/message";


// body("email", "Invalid email 000A000000").matches(/\d\d\dA\d\d\d\d\d\d/),

exports.VStudent = [
body("name", "name does not Empty").not().isEmpty(),
body("gender", "gender does not Empty").not().isEmpty(),
body("birthday", "birthdate does not Empty").not().isEmpty(),
body("major", "major does not Empty").not().isEmpty(),
async (req: any, res: Response, next: NextFunction) => {
    
  const file = req.file;
  // console.log('body', req.body);
  // console.log('file', file);
  const errors = validationResult(req);


  if (!errors.isEmpty() || !file) {
    let dataError : any = []

    if(!errors.isEmpty()){
      dataError = errors.array()
    }

    if(!file){
      dataError = [...dataError, {
        type: "field",
        msg: Message.avatarNotEmpty,
        path: "avatar",
        location: "file"
    }]
    }else{
     await s3.deleteObject({
        Bucket: 'vhuportal',
        Key: file.key
      },function (err: any,data: any){})
    }

    return res
      .status(200)
      .json({ result: false, data: dataError });
    
  }


  if(file && errors.isEmpty()) {
    next()  
  }
}]