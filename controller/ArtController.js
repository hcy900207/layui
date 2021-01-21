let ArtController = {}

//导入模拟（mock）的死数据
let articieData = require("../mockData/article.json")
const dbquery = require('../util/dbquery.js')

ArtController.allarticle = async (req,res) => {
    //获取查询字符串
    let {page,limit:pagesize} = req.query;
    //编写语句
    let offset = (page - 1) * pagesize;
    let sql = `select * from article limit ${offset},${pagesize}`;
    let sql1 = `select count(*) as count from article`
    let data = await dbquery(sql);
    let dataCount = await dbquery(sql1);
    let response = {
        code: 0,
        count: dataCount[0].count,
        data: data,
        msg: ''
    }
    res.json (response)
}

//导出
module.exports = ArtController;