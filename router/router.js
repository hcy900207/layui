let express = require('express');

//获取路由器
let router = express.Router();

//引入multer
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

//导入CateController
const CateController = require('../controller/CateController.js');
const ArtController = require('../controller/ArtController.js');
const UserController = require('../controller/UserController.js');
const dbquery = require('../util/dbquery.js');

// 统计出分类的文章总数
router.get('/cateCount',async (req,res)=>{
    let sql = `select count(*) total ,t2.name,t1.cat_id from article t1 
                left join category t2 
                on t1.cat_id = t2.cat_id 
                group by  t1.cat_id`;
    let data = await dbquery(sql);   
    res.json(data)
})


router.get('/',(req,res) => {
    //et data = {
     //   userInfo:req.session.userInfo
    //}
    //res.render("后台系统.html",data)
    res.render("后台系统.html")
})

router.get('/table',(req,res) => {
    res.render("layui后台静态表格.html")
})

router.get('/from',(req,res) => {
    res.render("layui后台表单.html")
})

//文章
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

//获取文章数据接口
router.get('/allarticle',ArtController.allarticle)
//删除文章数据接口
router.post('/delArticle',ArtController.delArticle)
//修改文章状态是否发布的接口
router.post('/updStaus',ArtController.updStaus)

//获取编辑文章数据接口
router.get('/artedit',ArtController.artedit)
//获取添加文章数据接口
router.get('/artadd',ArtController.artadd)
//添加到数据库接口
router.post('/postAdd',ArtController.postAdd)
//引入multer上传文件接口
router.post('/upload',upload.single('file'),ArtController.upload)
//获取单条数据库的数据接口
router.get('/getOneArt',ArtController.getOneArt)
//编辑文章数据请求
router.post('/updArt',ArtController.updArt)


//login 登录页面
router.get('/login',(req,res) => {
    //如果有用户信息就能再才访问
    if(req.session.userInfo){
        res.redirect('/');
        return;
    }
    res.render('login.html')
})
//lohin用户登录路径
router.post('/signin',UserController.signin)
//login 页面退出
router.get('/logout',(req,res) => {
    //退出清除所有数据
    req.session.destroy(err =>{
        if(err){
            throw err;
        }
    })
    res.render('login.html')
})

//暴露路由
module.exports = router; 