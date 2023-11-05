const pool = require("../config/database.js");
import { ResultSetHeader } from 'mysql2';
import { IFeeResponse, IPayPost } from '../interface/fee';


export const feeModel = {
    async pay(body : IPayPost) {
        try {
          const [rows]: [ResultSetHeader] = await pool.mysqlPool.query(
            `INSERT INTO TBL_PAY
            (TOTAL,STUDENT) 
        VALUE 
            (?, ?)`,[body.total, body.student]
          );
          await pool.mysqlPool.query(
            `UPDATE TBL_SIGN_TEACH
             SET PAY = 'Y'
             WHERE STUDENT = ?`,[body.student]
          );
    
          return rows.insertId;
        } catch (error) {
          throw error;
        }
      },
      async getFee(id: string) {
        try {
          const [rows]: [IFeeResponse] = await pool.mysqlPool.query(
            `SELECT * FROM TBL_PAY WHERE STUDENT = ?`,[id]
          );
    
          return rows;
        } catch (error) {
          throw error;
        }
      },

      async getAllFee() {
        try {
          const [rows]: [IFeeResponse] = await pool.mysqlPool.query(
            `SELECT * FROM TBL_PAY`
          );
    
          return rows;
        } catch (error) {
          throw error;
        }
      },
 
};
