
import bcrypt from 'bcrypt'
import {  studentModel } from '../model/student'
import { authModel } from '../model/auth';
const jwt = require('jsonwebtoken');

 class AuthServices {
    hashPassword =  async (password: string)  => {
        try {
            const hash = await bcrypt.hash(password, 10);
            return hash

        } catch (error) {
            throw(error)
        }
    }
    verifyPassword = async (password: string, passwordHash: string) : Promise<Boolean> =>  {
        try {
            let verify = false
            await bcrypt.compare(password, passwordHash).then(function(result) {
                verify = result
            });
            return verify
        } catch (error) {
            throw(error)
        }
    }
    generateAllToken = async (email: string) =>  {
        try {
            const accessToken : string = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, { expiresIn: '1hr' });//1hour 1hr
            const refreshToken : string = jwt.sign({ email: email }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });// 1 WEEK
            const cookieOptions = {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 1 WEEK
                httpOnly: true,
                secure: false,  //FOR HTTP
            };
            return {
                accessToken:accessToken,
                refreshToken:refreshToken,
                cookieOptions:cookieOptions
            }
        } catch (error) {
            throw(error)
        }
    }
    generateAccessTokenAgain = async (email: string) =>  {
        try {
            const accessToken : string = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, { expiresIn: '10s' });//1hour 1hr

            return accessToken
            
        } catch (error) {
            throw(error)
        }
    }
    
    verifyEmai = async (email: string)  => {
        try {

            const student  = await studentModel.verifyEmail(email)
            if(student){
                return student
            }else{
                return null
            }
        } catch (error) {
            throw(error)
        }
    }

    verifyEmaiWithToken = async (email: string, accessToken : string)  => {
        try {

            const verify  = await authModel.verifyEmailWithToken(email,accessToken )
            if(verify){
                return verify
            }else{
                return null
            }
        } catch (error) {
            throw(error)
        }
    }

    verifyEmaiWithRefreshToken = async (email: string, refreshToken : string)  => {
        try {

            const verify  = await authModel.verifyEmailWithReFreshToken(email,refreshToken )
            if(verify){
                return verify
            }else{
                return null
            }
        } catch (error) {
            throw(error)
        }
    }

}

export const authServices = new AuthServices()
