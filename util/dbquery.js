
var mysql = require('mysql');


//导入数据库
let dbConfig = require('../config/db.json')
var connection = mysql.createConnection({
   //展开引入参数
   ...dbConfig
}); 

//连接mysql
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});



//查询数据库
//let sql = "select * from category order by cat_id"
//connection.query(sql,(err,rows) => {
 //   if(err){
 //       throw err;
//    }
 //  res.json(rows)
//})


 function dbquery(sql){
    return new Promise((resolve,reject) => {
        connection.query(sql, (err, data) => {
            if (err) {
                reject(err) ;
            }
            resolve(data)
        })
    })
 }  
 
  module.exports = dbquery;