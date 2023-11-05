const pool = require("../config/database.js");
import { ResultSetHeader } from "mysql2";
import {
  ISemeterResponse,
  ISignTeachOfTeacherAndSubject,
  ISignTeachOfTeacherAndSubjectPost,
  ISignTeachOfTeacherAndSubjectResponse,
  ISignTeachOfTeacherResponse,
  ISignTeachPost,
  ISignTeachResponse,
  ITeachResponse,
} from "../interface/teach";

export const teachModel = {
  async getTeachSemeter(id: number) {
    try {
      const [rows]: [ITeachResponse] = await pool.mysqlPool.query(
        `SELECT DISTINCT A.ID, B.NAME AS SUBJECT,  B.CREDIT AS CREDIT, C.NAME AS TEACHER ,F.NAME AS MAJOR,D.NAME AS CLASS,E.NAME AS SEMETER ,
          A.DAY,A.SESSION
          FROM TBL_TEACH A
          LEFT JOIN TBL_SUBJECT B 
          ON A.SUBJECT = B.ID
          LEFT JOIN TBL_STUDENT C
          ON A.TEACHER = C.ID
          LEFT JOIN TBL_MAJOR F
          ON A.MAJOR = F.ID
          LEFT JOIN TBL_CLASS D
          ON A.CLASS = D.ID
          LEFT JOIN TBL_SEMETER E
          ON A.SEMETER  = E.ID WHERE A.SEMETER = ?`,
        [id]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },
  async deteleSignTeach(id: number) {
    try {
      const [rows]: [ResultSetHeader] = await pool.mysqlPool.query(
        `DELETE FROM TBL_SIGN_TEACH WHERE ID  = ?`,
        [id]
      );

      return rows.affectedRows;
    } catch (error) {
      throw error;
    }
  },
  async getSignTeach(id: string) {
    try {
      const [rows]: [ISignTeachResponse] = await pool.mysqlPool.query(
        `SELECT Z.ID, Z.STUDENT, Z.TEACH, Z.PAY, Z.C_TIME, B.CREDIT AS CREDIT, B.NAME AS SUBJECT,C.NAME AS TEACHER ,F.NAME AS MAJOR,D.NAME AS CLASS,E.NAME AS SEMETER ,
        A.DAY,A.SESSION
        FROM TBL_SIGN_TEACH Z
         LEFT JOIN  TBL_TEACH A
         ON Z.TEACH = A.ID
        LEFT JOIN TBL_SUBJECT B 
        ON A.SUBJECT = B.ID
        LEFT JOIN TBL_STUDENT C
        ON A.TEACHER = C.ID
        LEFT JOIN TBL_MAJOR F
        ON A.MAJOR = F.ID
        LEFT JOIN TBL_CLASS D
        ON A.CLASS = D.ID
        LEFT JOIN TBL_SEMETER E
        ON A.SEMETER  = E.ID 
       WHERE Z.STUDENT =  ?`,
        [id]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getSignTeachOfTeacher(id: number) {
    try {
      const [rows]: [ISignTeachOfTeacherResponse] = await pool.mysqlPool.query(
        `
        SELECT A.NAME AS SEMETER , A.YEAR, E.NAME AS TEACHER, D.NAME AS SUBJECT,COUNT(C.TEACH) AS NUMBER_STUDENT  FROM TBL_SEMETER A
        LEFT JOIN  (
          SELECT ID,TEACHER,SEMETER,SUBJECT FROM TBL_TEACH GROUP BY SEMETER,SUBJECT
        ) B ON B.SEMETER = A.ID
        LEFT JOIN  (
          SELECT TEACH  FROM TBL_SIGN_TEACH 
        ) C ON C.TEACH = B.ID
        LEFT JOIN  (
          SELECT ID,NAME  FROM TBL_SUBJECT
        ) D ON D.ID = B.SUBJECT
        LEFT JOIN  (
          SELECT NAME,ID FROM TBL_STUDENT WHERE IS_ADMIN =2
        ) E ON E.ID = B.TEACHER
        WHERE B.TEACHER = ?
        AND COALESCE (C.TEACH) IS NOT NULL
        GROUP BY D.NAME
        
        `,
        [id]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getSignTeachOfTeacherAndSubject(body: ISignTeachOfTeacherAndSubjectPost) {
    try {
      const [rows]: [ISignTeachOfTeacherAndSubjectResponse] = await pool.mysqlPool.query(
        `
        SELECT B.EMAIL,B.NAME,B.AVATAR,B.BIRTHDAY, E.EMAIL AS TEACHER ,D.NAME AS SUBJECT FROM TBL_SIGN_TEACH A
        JOIN TBL_STUDENT B
        ON A.STUDENT = B.EMAIL 
        JOIN TBL_TEACH C
        ON A.TEACH = C.ID
        JOIN TBL_SUBJECT D
        ON C.SUBJECT = D.ID
        JOIN TBL_STUDENT E
        ON C.TEACHER = E.ID
        WHERE E.EMAIL  = ? AND D.NAME = ?
        `,
        [body.teacher, body.subject]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getSemeter() {
    try {
      const [rows]: [ISemeterResponse] = await pool.mysqlPool.query(
        `SELECT * FROM TBL_SEMETER`
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },
  async openSemeter(id: number) {
    try {
      const [row1]: [ResultSetHeader] = await pool.mysqlPool.query(
        `UPDATE TBL_SEMETER
            SET TBL_SEMETER.ON = 'Y'
            WHERE ID = ?`,
        [id]
      );

      const [row2]: [ResultSetHeader] = await pool.mysqlPool.query(
        `UPDATE TBL_SEMETER
              SET TBL_SEMETER.ON = 'N'
              WHERE ID != ?`,
        [id]
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  async closeSemeter(id: number) {
    try {
      const [row1]: [ResultSetHeader] = await pool.mysqlPool.query(
        `UPDATE TBL_SEMETER
            SET TBL_SEMETER.ON = 'N'
            WHERE ID = ?`,
        [id]
      );

      return true;
    } catch (error) {
      throw error;
    }
  },
  async signTeach(body: ISignTeachPost) {
    try {
      const [rows]: [ResultSetHeader] = await pool.mysqlPool.query(
        `INSERT INTO TBL_SIGN_TEACH
        (TEACH,STUDENT) 
    VALUE 
        (?, ?)`,
        [body.teach, body.student]
      );

      return rows.insertId;
    } catch (error) {
      throw error;
    }
  },
};
