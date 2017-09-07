var dxObj = (function(){
    var isNext = false;
    function next(){
        isNext = !isNext;
        if(isNext){
            showNext();
        }else{
            hideNext();
        }
    }
    function hideNext(){
        $(".bottomControl").hide();
    }
    function showNext(){
        $(".bottomControl").show();
    }
    function replace(){
        //隐藏图片
        $("#zpResumeListTable .listMore img").hide()
        //替换姓名为***
        $("#zpResumeListTable tr td[name]").prev().text("***")
        //点击打开自我评价和最近工作
        $("#zpResumeListTable tr td[name]").click()
    }
    function show(){
        //点击打开自我评价和最近工作
        $("#zpResumeListTable tr td[name]").click()
    }
    function removeAll(){
        //擅长头部元素
        $("#RD_topCon").remove();
        //擅长广告
        $(".more_send")[0] && $(".more_send")[0].remove();
        //擅长主动投递简历
        $(".resumes-index-title")[0] && $(".resumes-index-title")[0].remove();
        //删除高级搜索
        $("#customSearch").remove();
        //删除更多按钮
        $(".result-form-bottom")[0] && $(".result-form-bottom")[0].remove();
        //删除简历显示现象，合适不合适
        $(".add_container ")[0] && $(".add_container ")[0].remove();
        //删除码
        $("#ZPEWMcode").remove();
        //删除在线客服
        $("#live25").remove();
        //版权替换
        $(".rd-resume-foot").text("大象");
    }

    function oneStart(){
        removeAll();
        replace();
        replace();
        show();
    }
    //暴露接口
    return {
        replace:replace,
        show: show,
        next: next,
        oneStart: oneStart,
        removeAll: removeAll
    }
})()