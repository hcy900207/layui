const responseMessage = {
    delsucc: {errcode:0,'message':"删除成功"},
    delfail:{errcode:10001,'message':"服务器繁忙，稍后再试"},
    exception:{errcode:10002,'message':"服务器繁忙，稍后再试"},
    argsfail:{errcode:10001,'message':"参数有误"}
}
module.exports = responseMessage;