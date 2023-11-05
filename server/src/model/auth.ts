const pool = require("../config/database.js");

export const authModel = {
   async saveAllToken(body : {accessToken: string, refreshToken: string, email: string}) {
    try {
        const [auth] = await pool.mysqlPool.query(`SELECT * FROM TBL_TOKEN WHERE EMAIL = ? LIMIT 1`,[body.email])
        if(auth[0]){
            await pool.mysqlPool.query(
                `UPDATE TBL_TOKEN
                 SET ACCESS_TOKEN = ? , REFRESH_TOKEN = ?
                 WHERE EMAIL = ?`,
                [body.accessToken, body.refreshToken, body.email]
              ) ;
        }else{
              await pool.mysqlPool.query(
                `INSERT INTO TBL_TOKEN
                        ( ACCESS_TOKEN , REFRESH_TOKEN, EMAIL) 
                    VALUE 
                        ( ?, ?, ?)`,
                [body.accessToken, body.refreshToken, body.email]
              ) ;
        }
        return true
    } catch (error) {
      throw(error);
    }
  },
  async saveAccessToken(body : {accessToken: string, email: string}) {
    try {
            await pool.mysqlPool.query(
                `UPDATE TBL_TOKEN
                 SET ACCESS_TOKEN = ? 
                 WHERE EMAIL = ?`,
                [body.accessToken, body.email]
              ) ;
    
        return true
    } catch (error) {
      throw(error);
    }
  },
  async verifyEmailWithToken(email : string, accessToken : string){
    try {
        const [row]   =  await pool.mysqlPool.query(
          `SELECT ACCESS_TOKEN FROM TBL_TOKEN WHERE ACCESS_TOKEN = ? AND EMAIL = ? LIMIT 1`,
          [accessToken, email]
        ) ;

      return row[0]
    } catch (error) {
      throw(error);
    }
  },
  async verifyEmailWithReFreshToken(email : string, refreshToken : string){
    try {
        const [row]   =  await pool.mysqlPool.query(
          `SELECT REFRESH_TOKEN FROM TBL_TOKEN WHERE REFRESH_TOKEN = ? AND EMAIL = ? LIMIT 1`,
          [refreshToken, email]
        ) ;

      return row[0]
    } catch (error) {
      throw(error);
    }
  }
};
