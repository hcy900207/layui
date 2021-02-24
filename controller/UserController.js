let UserController = {};

const dbquery = require('../util/dbquery.js')

//加密文件导入
let md5 = require('md5');
let {secret:passSecret} = require('../config/app.json');

//登录接口
UserController.signin = async (req,res)=>{
    //1.接收参数
    let {username,password} = req.body;
    //2.数据库查询,要把密码md5加密之后在判断
    password = md5(`${password}${passSecret}`);
    let sql = `select * from users where username='${username}' and password = '${password}'`
    let data = await dbquery(sql);
    //3.响应结果
    if(data.length){
        // 匹配成功 
        // 1.把用户信息存入到会话session中，
        let userInfo = data[0];
        req.session.userInfo = userInfo; 
        // 2.更新此次的登录时间
        let sql = `update users set last_login_date=now() where user_id  = ${userInfo.user_id}`;
        await dbquery(sql)
        res.json({errcode:0,message:'登录成功',userInfo})
    }else{
        // 匹配失败
        res.json({errcode:10008,message:'用户名或密码错误'})
    }

}
/*
    UserController.edit_user = async(req,res)=>{
    let {username, avatar, account_id} = req.body;
    let sql = `update users set avatar='${avatar}',account_id='${account_id}' where username='${username}'`
    let result = await dbquery(sql);
    if(result.affectedRows) return res.json(editsuccess);
    res.json(editfail);
}
*/

// 更新用户头像
UserController.updateImg = async (req,res)=>{
    let {avatar} = req.body;
    let user_id = req.session.userInfo.user_id;
    let sql = `update users set avatar = '${avatar}' where user_id = ${user_id}`
    let result = await dbquery(sql)
    if(result.affectedRows){
        // 成功
        res.json({code:0,message:"修改头像成功"})
    }else{
        res.json({code:1,message:"修改头像失败"})
    }
}







module.exports = UserController;