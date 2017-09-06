//配置项
var dxConfig = {
    isAnimating: false,
    overLimit: true,
    limitSize: 2567,
    wallLimit: 186
};
;(function (dxConfig) {
  function getLastTotal() {
    var result = arrfiles.length;
    for (var i = 0; i < arrfiles.length; i++) {
      if (arrfiles[i].isEmpty) {
        result = i;
        break;
      }
    }
    if (dxConfig.overLimit) {
      result = arrfiles.length + limitSize;
    }
    return result;
  }

  function animHead(index) {
    dxConfig.isAnimating = true;
    var $element = $(objects[index].element);
    var objData = arrfiles[index];
    if (objData.isNeedAnimate) {
      $element.find(">a").click();
      setTimeout(function () {
        $(".lightboxOverlay").click();
        var newSrc = $element.find(">a>img").attr("data-newsrc");
        $element.find(">a>img").attr("src", newSrc);
        $element.find(">a").addClass("a-ring");
        objData.isNeedAnimate = false;
        var nextIndex = index + 1;
        if (nextIndex >= arrfiles.length) {
          nextIndex = 0;
        }
        var nextObj = arrfiles[nextIndex];
        if (nextObj.isNeedAnimate) {
          setTimeout(function () {
            animHead(index + 1);
          }, 1200);
        } else {
          dxConfig.isAnimating = false;
        }
      }, 2500);
    }
  }


  //定时轮询后台签到信息
  var stop = false
  setInterval(function () {
    if (stop) return;
    stop = true;
    $.get('./data/getSign.json', function (data) {
      if (data.ret == 0) {
        var total = data.model.total;
        var record = data.model.record;
        var o_lastTotal = getLastTotal();
        var animateIndex = getLastTotal() % dxConfig.wallLimit;
        for (var i = 0; i < record.length; i++) {
          var r = record[i];
          var lastTotal = getLastTotal() % dxConfig.wallLimit;
          arrfiles[lastTotal].isEmpty = false;
          arrfiles[lastTotal].isNeedAnimate = true;
          var $element = $(objects[lastTotal].element);
          var headImgUrl = r.head ? r.head : (platform.staticUrl + '/image/page/nianhui/screen/default.png');
          var bigImg = headImgUrl;
          // if(headImgUrl.endsWith("/132")){
          //  bigImg = headImgUrl.substring(0,headImgUrl.lastIndexOf("/"))+"/0";
          // }
          var image = $element.find(">a>img")[0];
          image.addEventListener('load', function (event) {
            resizeImg(this, 120, 120);
          }, false);
          $element.find(">a").attr("href", bigImg).attr("title", r.nickname).append("<img src='" + headImgUrl + "' style='display:none;'/>");
          $element.find(">a>img").attr("data-newsrc", headImgUrl);
        }
        if (!dxConfig.isAnimating && record.length > 0) {
          animHead(animateIndex);
        }
        if (dxConfig.overLimit) {
          dxConfig.limitSize += record.length;
        } else if ((record.length + o_lastTotal) > dxConfig.wallLimit) {
          dxConfig.overLimit = true;
          dxConfig.limitSize = (record.length + o_lastTotal) - wallLimit;
        }
      }
      stop = false;
    }, "json");
  }, 5000);

}(dxConfig))
