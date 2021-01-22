//工具函数
(function(window,undefined){
    function startNProgress() {
        //加载进度条
        NProgress.set(0.4)
        let interval = setInterval(function () {
            NProgress.inc();
        }, 200)
        $(window).on('load', () => {
            clearInterval(interval)
            NProgress.done()
        })
    }    
    startNProgress();

    let util = {
        date_fromat:function(date,fromat="YYYY-MM-DD HH:mm:ss"){
            return moment(date).fromat(fromat)
        }
    }

    //暴露全局
    window.util = util;
})(window)

