let ArtController = {}

//导入文件上传的模块
const fs = require('fs')

//导入模拟（mock）的死数据
let articieData = require("../mockData/article.json")
const {delsucc,delfail,exception,argsfail} = require('../util/responseMessage.js')
const dbquery = require('../util/dbquery.js')

//获取文章控制器（分页）
ArtController.allarticle = async (req,res) => {
    //获取查询字符串
    let {page,limit:pagesize} = req.query;
    //编写语句
    let offset = (page - 1) * pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id
        order by art_id desc limit ${offset},${pagesize}`;
    let sql1 = `select count(*) as count from article`
    let promise1 = dbquery(sql)
    let promise2 = dbquery(sql1)
    //实现并行
    let result = await Promise.all([promise1,promise2])
    let data = result[0];
    let count = result[1][0].count;
        let response = {
            code: 0,
            //总数据
            count: count,
            data: data,
            msg: ''
        }
        res.json (response)
}
//文章删除控制器（方法）
ArtController.delArticle = async (req,res) => {
    //解构
    let {art_id} =req.body;
    //编写删除语句
    let sql = `delete from article where art_id = ${art_id }`;
    let result = await dbquery(sql);
    if(result.affectedRows){
         res.json({delsucc})
    }else{
        res.json({delfail})
    }
}
/*
//文章编辑控制器
ArtController.artedit = (req,res) => {
    res.render('aeticle-edit.html')
}
*/

//文章添加控制器
ArtController.artadd = (req,res) => {
    res.render('aeticle-add.html')
}
//提交数据库
ArtController.postAdd = async(req,res) => {
    let {title,cat_id,status,content,cover} = req.body;
    let sql =`insert into article(title,content,status,cat_id,cover,publish_data)
    values('${title}','${content}','${status}','${cat_id}','${cover}','now()')
    `;
    let result = await dbquery(sql)
   //判断返回一个结果
   if(result.affectedRows){
        res.json({errcode:0,message:"编写成功"})
    }else{
        res.json({errcode:10009,message:"编写失败"})
    }
}
//上传文件接口
ArtController.upload = (req,res)=>{
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({code:0,message:'文件上传成功',src:newPath})
        })
    }else{
        res.json({code:1,message:'上传文件失败'})
    }
    
    
}

//修改文章状态是否发布的接口
ArtController.updStaus = async (req,res) => {
    //赋值
    let {art_id,status} = req.body;
    let sql = `update article set status = ${status} where art_id = ${art_id}`;
    let result = await dbquery(sql);
    if(result.affectedRows){
        res.json({errcode:0,message:"编写成功"})
    }else{
        res.json({errcode:10009,message:"编写失败"})
    }
}


//导出
module.exports = ArtController;