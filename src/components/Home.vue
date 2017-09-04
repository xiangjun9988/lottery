<template>
  <section class="home">
  <div class="row">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <div class="panel panel-primary">
        <div class="page-header">
          <h1>参与名单<small>100人</small></h1>
        </div>

        <div class="panel-body" style="height:400px;overflow:auto;">
          <ul class="list-group">
            <li class="list-group-item" v-for="item in 100">张三{{item}} 182****0698</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <div class="panel panel-primary">
        <div class="page-header">
          <h1>学院利好</h1>
        </div>

        <div class="panel-body">
          <ul class="list-group">
            <li class="list-group-item">Item 1</li>
            <li class="list-group-item">Item 2</li>
            <li class="list-group-item">Item 3</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <div class="panel panel-primary">
        <div class="page-header">
          <h1>奖品信息</h1>
        </div>

        <div class="panel-body">
          <ul class="list-group">
            <li class="list-group-item" v-for="info in jpInfo">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <div class="panel panel-primary">
        <div class="page-header">
          <h1>参与名单<small>100人</small></h1>
        </div>

        <div class="panel-body">
          <ul class="list-group">
            <li class="list-group-item">Item 1</li>
            <li class="list-group-item">Item 2</li>
            <li class="list-group-item">Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  </section>
</template>

<script>
export default {
    data () {
        return {
            userList:['张三'],
            jpInfo:["100元3名","50元5名","20元50名","10元100名","5元292名"]
        }
    }
}
</script>

<style>
.home{
    padding:0 20px;
    margin-top:45px;
}
.page-header{
    margin: 10px 0 10px;
}
</style>
