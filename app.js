const express = require('express');
const app = express();
const path = require('path');

const router = require('./router/router.js') 


// 引入session会话技术
let session = require('express-session');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//中间件托管
app.use('/public',express.static(path.join(__dirname,'public')));
//图片中间件
app.use('/uploads',express.static(path.join(__dirname,'uploads')));



//模板引擎引入
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
//配置模板引擎
app.set('views', __dirname + '/views/');
app.engine('html', express_template); 
app.set('view engine', 'html');



// 初始化session,定义session一些配置
let options = {
    name:"SESSIONID", // 待会写入到cookie中标识
    secret: "FGVH$#E%&", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        maxAge:60000*24, // session在cookies存活24分钟，
        // 再次访问，时间重置为24分钟， 24分钟内只要不访问则会失效
    }
};
app.use( session(options) )

//在路由之前要关闭权限
app.use(function(req,res,next){
    //获取访问的路由
    let path = req.path.toLowerCase();
    //获取不需要权限的路由
    let noCheckAuth = ['/signin','/login','/logout']
    if(noCheckAuth.includes(path)){
        //开放
        next();
    }else{
        if(req.session.userInfo){
            next(); 
        } else{
            res.redirect('/login')
        }
    }
});


//路由中间件
app.use(router)



app.listen(8100,()=>{
    console.log('服务已经启动');
})