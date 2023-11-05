const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { authServices } from "../services/auth";
import { Message } from "../utils/message";
import { IToken, ITokenExpired } from "../interface/auth";

class AuthMiddleware {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken: string = req.header("Authorization")?.replace("Bearer ", "")!;
      const dataAccess: IToken = await jwt.verify(accessToken,process.env.ACCESS_TOKEN);

      console.log("accessToken", accessToken);
      console.log("dataAccess", dataAccess);

        const verify = await authServices.verifyEmaiWithToken(dataAccess.email, accessToken);
        if (verify) {
          next();
        } else {
          throw new Error();
        }

    } catch (error) {
        if(isErrorExpired(error)){
            return res.status(200).json({
                result: true,
                data: error
                // data: error.message as unknown as ITokenExpired ,
            });
        }else{
            return res.status(200).json({
                result: true,
                data: Message.authForbidden,
            });
        }
    }
  };
}

export function isErrorExpired(error: unknown): error is ITokenExpired {
    return typeof error === 'object' && error !== null && 'message' in error && 'expiredAt' in error
}
  

export const authMiddleware = new AuthMiddleware();
