let ArtController = {}

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
    let sql = `select * from article limit ${offset},${pagesize}`;
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
    let {title,cat_id,status,content} = req.body;
    let sql =`insert into article(title,content,status,cat_id)
    values('${title}','${content}','${status}','${cat_id}')
    `;
    let result = await dbquery(sql)
   //判断返回一个结果
   if(result.affectedRows){
        res.json({errcode:0,message:"编写成功"})
    }else{
        res.json({errcode:10009,message:"编写失败"})
    }
}



//导出
module.exports = ArtController;