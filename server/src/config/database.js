
mysqlConfig = {
    connectionLimit : 100,     
    host     : '127.0.0.1',
    user: "root",
    password: "123",
    port     :3306,
    database : 'vhu',
    charset  : 'utf8'
};

let mysql = require('mysql2/promise');
let mysqlPool = mysql.createPool(mysqlConfig);
exports.mysqlPool = mysqlPool;
