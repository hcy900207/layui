const express = require('express');
const app = express();
const path = require('path');

const router = require('./router/router.js')

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


//路由中间件
app.use(router)



app.listen(8100,()=>{
    console.log('服务已经启动');
})