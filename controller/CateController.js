//控制器

let CateController = {};
const {delsucc,delfail,exception,argsfail} = require('../util/responseMessage.js')
const dbquery = require('../util/dbquery.js')

CateController.category = (req,res) => {
    res.render("category-index.html")
}

//获取数据库的所有数据
CateController.getCate = async(req,res) => {
    //查询数据库
    let sql = "select * from category order by cat_id"
    let data = await dbquery(sql);
    res.json(data)
}

//编辑获取单条数据参数接口
CateController.getOneCate = async(req,res) => {
    //接收参数
    let {cat_id} = req.query;
    //验证
    //如果为假返回失败语句
    if(!cat_id){
        res.json(argsfail)
    }else{ 
        //如果为真则查询数据库并返回数据
        //查询数据库
        let sql = `select * from category where cat_id = ${cat_id}`
        let data = await dbquery(sql);
        //返回数据时要判断一下并给出成功或者失败语句（可以封装起来，但是由于你懒得封装那就直接写吧）
        if(data.length){
            //成功
            data[0].errcode = 0;
            res.json(data[0])
        }else{
            //失败
            res.json({errcode:10006,message:"编辑失败"})
        }

    }
}

CateController.delCat = async(req,res) => {
    let {cat_id} = req.body
    //判断
    if(!cat_id){
        res.json(argsfail)
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`
        //connection.query(sql,(err,result) => {
        //    if(result.affectedRows){
        //        res.json({errcode:0,'message':"删除成功"})
        //   }else{
        //        res.json({errcode:10002,'message':"服务器繁忙，稍后再试"})
        //   }
        //})
        let result;
        let response;
        try{
            result = await dbquery(sql)
            if(result.affectedRows){
                response = delsucc;
            }else{
                response = delfail;
            }
            
        }catch(e){
            response = exception;
        }
        res.json(response)
    }
}

//获取添加页面
CateController.catadd = (req,res) => {
    res.render('category-add.html')
}
//添加到数据库
CateController.postCatadd = async(req,res) => {
    //接收参数
    let {name,sort,add_date} = req.body;
    //放到数据库中
    let sql = `insert into category(name,sort,add_date) values ('${name}',${sort},'${add_date}')`
    let result = await dbquery(sql);
    //判断是否成功
    if(result.affectedRows){
        //成功
        res.json({errcode:0,message:"添加成功"})
    }else{
        res.json({errcode:10006,message:"添加失败"})
    }
}

//获取编辑页面
CateController.catedit = (req,res) => {
    res.render('category-edit.html')
}
//实现编辑传入数据库
CateController.updCate = async (req,res) => {
    //接受参数 先解构获取参数
    let {cat_id,name,sort,add_date} = req.body
    if(!cat_id){
        res.json(argsfail) 
        return;
    }
    //编写sql语句
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}'where cat_id=${cat_id}`;
    let result = await dbquery(sql)
    //判断返回一个结果
    if(result.affectedRows){
        res.json({errcode:0,message:"编写成功"})
    }else{
        res.json({errcode:10007,message:"编写失败"})
    }
}


//导出
module.exports = CateController;