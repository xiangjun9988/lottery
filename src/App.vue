<template>
  <div id="app">
    <!-- 头部导航 -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <a class="navbar-brand" href="#">抽奖系统</a>
        <ul class="nav navbar-nav">
            <li class="active">
                <a href="#">首页</a>
            </li>
            <li>
                <a href="#">中奖名单</a>
            </li>
             <li>
                <a href="#">参与抽奖者</a>
            </li>
            <li>
                <a href="#">学院喜报</a>
            </li>
        </ul>
        <div class="btn-group pull-right bw-r">
          <button type="button" class="btn btn-default">抽奖报名</button>
          <button type="button" class="btn btn-default">参与名单</button>
          <button type="button" class="btn btn-default">设置</button>
      </div>
    </nav>
    <!-- 彩蛋效果 -->
    <canvas-box></canvas-box>
    <router-view></router-view>
  </div>
</template>

<script>
import CanvasBox from '@/components/CanvasBox'
import Home from '@/components/Home'
export default {
  name: 'app',
  components:{
    CanvasBox,
    Home
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
.navbar .bw-r{
  margin-top:10px;
  margin-right:20px;
}
</style>
