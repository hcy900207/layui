let express = require('express');

//获取路由器
let router = express.Router();

//导入CateController
const CateController = require('../controller/CateController.js');

router.get('/',(req,res) => {
    res.render("后台系统.html")
})

router.get('/table',(req,res) => {
    res.render("layui后台静态表格.html")
})

router.get('/from',(req,res) => {
    res.render("layui后台表单.html")
})

//数据库
router.get('/aeticle',(req,res) => {
    res.render("aeticle-index.html")
})
//栏目管理页面
router.get('/category',CateController.category)

//获取数据库的数据接口
router.get('/getCate',CateController.getCate)

//编辑获取单个数据的数据接口
router.get('/getOneCate',CateController.getOneCate)

//删除接口
router.post('/delCat',CateController.delCat)
  
//添加接口
router.get('/catadd',CateController.catadd)
//添加到数据库
router.post('/postCatadd',CateController.postCatadd)

//获取编辑接口
router.get('/catedit',CateController.catedit)

//编辑入库接口
router.post('/updCate',CateController.updCate)

//暴露路由
module.exports = router;