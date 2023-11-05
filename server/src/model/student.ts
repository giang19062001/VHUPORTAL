const pool = require("../config/database.js");
import { ResultSetHeader } from 'mysql2';
import {IStudentCreate, IStudentResponse, IStudentResponseJoin, ITeacherResponse } from '../interface/student';

export const studentModel = {
   async create(body : IStudentCreate) {
    try {
        const [rows]: [ResultSetHeader]  =  await pool.mysqlPool.query(
          `INSERT INTO TBL_STUDENT
                  ( EMAIL , PASSWORD, NAME, GENDER, BIRTHDAY, MAJOR, AVATAR) 
              VALUE 
                  ( ?, ?, ? , ? , ? , ?, ?)`,
          [body.email, body.password, body.name, body.gender, body.birthday, body.major ,body.avatar]
        ) ;
      return rows.insertId
    } catch (error) {
      throw(error);
    }
  },
  async verifyEmail(email : string) {
    try {
        const [row]   =  await pool.mysqlPool.query(
          ` SELECT A.ID, A.NAME, A.EMAIL, IF(A.GENDER = 0,'NAM','NỮ') AS GENDER, A.BIRTHDAY, IFNULL(B.NAME, '')  AS MAJOR, A.AVATAR , A.IS_ADMIN,A.PASSWORD
          FROM TBL_STUDENT  A
         LEFT JOIN TBL_MAJOR B
         ON A.MAJOR = B.ID
          WHERE A.EMAIL = ?  LIMIT 1`,
          [email]
        ) ;

      return row[0]
    } catch (error) {
      throw(error);
    }
  },
  async getAll() {
    try {
        const [rows] :[IStudentResponseJoin]   =  await pool.mysqlPool.query(
          `SELECT A.ID, A.NAME, A.EMAIL, A.GENDER, A.BIRTHDAY, B.NAME AS MAJOR, A.AVATAR 
          FROM TBL_STUDENT A 
          JOIN TBL_MAJOR B
          ON A.MAJOR = B.ID
           WHERE IS_ADMIN = 0`) ;

      return rows
    } catch (error) {
      throw(error);
    }
  },
  async getAllTeacher() {
    try {
        const [rows] :[ITeacherResponse]   =  await pool.mysqlPool.query(
          `
          SELECT A.ID, A.NAME, B.NAME AS MAJOR, A.AVATAR,A.EMAIL 
                    FROM TBL_STUDENT A 
                    JOIN TBL_MAJOR B
                    ON A.MAJOR = B.ID
                    WHERE IS_ADMIN = 2`) ;

      return rows
    } catch (error) {
      throw(error);
    }
  },
  async getDetail(email: string) {
    try {
        const [rows] :[IStudentResponseJoin]   =  await pool.mysqlPool.query(
          `
          SELECT A.ID, A.NAME, A.EMAIL, IF(A.GENDER = 0,'NAM','NỮ') AS GENDER, A.BIRTHDAY, B.NAME AS MAJOR, A.AVATAR FROM TBL_STUDENT  A
          JOIN TBL_MAJOR B
          ON A.MAJOR = B.ID
           WHERE A.EMAIL = ? LIMIT 1`,[email]) ;

      return rows[0]
    } catch (error) {
      throw(error);
    }
  },
  async getLastByMajor(major : number) {
    try {
        const [rows] :[IStudentResponse]   =  await pool.mysqlPool.query(
          `SELECT EMAIL FROM TBL_STUDENT WHERE MAJOR = ? AND IS_ADMIN = 0 ORDER BY C_TIME DESC  LIMIT 1  `,[major]) ;
      if(rows.length){
        return rows[0].EMAIL
      }else{
        return null
      }
    } catch (error) {
      throw(error);
    }
  }
 
};
