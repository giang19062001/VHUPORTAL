const pool = require("../config/database.js");
import { IMajorResponse, ISubjectResponse, ISubjectResponseJoin } from '../interface/subject';

export const subjectModel = {
  async getAllByMajor(id: number) {
    try {
        const [rows] :[ISubjectResponse]   =  await pool.mysqlPool.query(
          `SELECT * FROM TBL_SUBJECT WHERE MAJOR = ? `,[id]) ;

      return rows
    } catch (error) {
      throw(error);
    }
  },
  async getAll() {
    try {
        const [rows] :[ISubjectResponseJoin]   =  await pool.mysqlPool.query(
          `SELECT A.ID, A.NAME, B.NAME AS MAJOR , A.CREDIT FROM TBL_SUBJECT A
          JOIN TBL_MAJOR B ON A.MAJOR = B.ID `) ;

      return rows
    } catch (error) {
      throw(error);
    }
  },
  async getAllMajor() {
    try {
        const [rows] :[IMajorResponse]   =  await pool.mysqlPool.query(
          `SELECT * FROM TBL_MAJOR `) ;

      return rows
    } catch (error) {
      throw(error);
    }
  },
  async getDetailMajor(id: number) {
    try {
        const [rows] :[IMajorResponse]   =  await pool.mysqlPool.query(
          `SELECT * FROM TBL_MAJOR WHERE ID = ? LIMIT 1`,[id]) ;

      return rows[0].CHAR
    } catch (error) {
      throw(error);
    }
  },
};
