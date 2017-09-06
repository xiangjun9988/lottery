<template>
    <div id="goodBox">
        <div class="container-3d" id="container-3d">
            <div class="btn_menu" style="display: block;">
                <button class="btn btn-default" id="table">照片墙</button>
                <button class="btn btn-default" id="sphere">水晶球</button>
                <button class="btn btn-default" id="helix">螺旋塔</button>
                <button class="btn btn-default" id="grid">展览厅</button>
            </div>
        </div>
    </div>
</template>

<script>
import DxObj from './3d';

console.log(DxObj);
export default {
    mounted() {
        this._3dStart();
    },
    methods: {
        _3dStart() {
            // 获取护具
            function getFiles() {
                var html = $.ajax({
                    url: "/static/3d/data/data.json",
                    async: false
                }).responseText;
                return JSON.parse(html);
            }
            // var arrfiles = getFiles();
            var arrfiles = []
            while (arrfiles.length < 186) {
                arrfiles.push({ "head": "/static/3d/assets/image/page/nianhui/screen/3d_default.jpg", "nickname": "网络营销-用户", "isEmpty": true });
            }
            DxObj.start(arrfiles);
        }
    }
}
</script>

<style scoped>
/* @import '/static/3d/assets/css/demo.css'; */

@import '/static/3d/assets/css/page/nianhui/screen/common.css';
@import '/static/3d/assets/css/page/nianhui/3d/lightbox.css';
@import '/static/3d/assets/css/page/nianhui/3d/style.css';
#goodBox {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background:url('/static/3d/assets/image/page/nianhui/screen/bg.png') center;
    background-size: 100% 100%;
}

.btn_menu {
    position: fixed;
    top: 0;
    left: 0;
}
</style>
