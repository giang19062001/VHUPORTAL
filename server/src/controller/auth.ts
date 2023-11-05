import { IStudentCreate, IStudentJoin } from "../interface/student";
import { Request, Response, NextFunction } from "express";
import { authServices } from "../services/auth";
import { Message } from "../utils/message";
import { authModel } from "../model/auth";
import { IAuthInfo, IAuthLogin, IToken } from "../interface/auth";
import { isErrorExpired } from "../middleware/auth";
const jwt = require("jsonwebtoken");

class authController {
  login = async (req: Request, res: Response) => {
    const body: IAuthLogin = req.body;
    console.log('body', body);
    const student: IStudentJoin = await authServices.verifyEmai(body.email);
    if (!student) {
      return res.status(200).json({
        result: false,
        data: Message.emailNoExist,
      });
    } else {
      const verifyPass = await authServices.verifyPassword(
        body.password,
        student.PASSWORD!
      );
      if (verifyPass) {
        const dataToken = await authServices.generateAllToken(body.email);
        await authModel.saveAllToken({
          accessToken: dataToken.accessToken,
          refreshToken: dataToken.refreshToken,
          email: body.email,
        });
        res
          .cookie(
            "REFRESH_TOKEN",
            dataToken.refreshToken,
            dataToken.cookieOptions
          )
          .status(200)
          .json({
            result: true,
            data: <IAuthInfo>{
              id: student.ID,
              email: student.EMAIL,
              isAdmin: student.IS_ADMIN,
              avatar: student.AVATAR,
              birthday: student.BIRTHDAY,
              gender: student.GENDER,
              major: student.MAJOR,
              name: student.NAME,
              accessToken: dataToken.accessToken,
            },
          });
      } else {
        return res.status(200).json({
          result: true,
          data: Message.passwordWrong,
        });
      }
    }
  };
  refresh = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies["REFRESH_TOKEN"];
      const dataRefresh: IToken = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN
      );

      console.log("refreshToken", refreshToken);
      console.log("dataRefresh", dataRefresh);

      const verify = await authServices.verifyEmaiWithRefreshToken(
        dataRefresh.email,
        refreshToken
      );
      if (verify) {
        const accessToken = await authServices.generateAccessTokenAgain(
          dataRefresh.email
        );
        await authModel.saveAccessToken({
          accessToken: accessToken,
          email: dataRefresh.email,
        });
        return res.status(200).json({
          result: true,
          data: accessToken,
        });
      }
    } catch (error) {
      if (isErrorExpired(error)) {
        return res.status(200).json({
          result: true,
          data: error,
          // data: error.message as unknown as ITokenExpired ,
        });
      } else {
        return res.status(200).json({
          result: true,
          data: Message.authForbidden,
        });
      }
    }
  };
}

export const AuthController = new authController();
