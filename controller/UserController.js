let UserController = {};

const router = require('../router/router.js');
//导入dbquery
const dbquery = require('../util/dbquery.js')

//加密文件导入
let md5 = require('md5');
let {secret} = require('../config/app.json');

//用户登录控制器
UserController.signin = async (req,res) => {
    let {username,password} = req.body;
    //sql语句
    password = md5(`${password}${secret}`);
    let sql = `select * from users where username='${username}' and password="${password}"`
    let data = await dbquery(sql);
    if(data.length){
        //设置回话
        let userInfo = data[0];
        req.session.userInfo = userInfo;
        res.json({errcode:0,message:"登录成功"})
    }else{
        res.json({errcode:10010,message:"用户名或者密码错误"})

    }
}

module.exports = UserController;