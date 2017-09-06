function getFiles(){
	var html = $.ajax({
	  url: "./data/data.json",
	  async: false
	}).responseText; 
	return JSON.parse(html);
}
// var arrfiles = getFiles();
var arrfiles = []
while(arrfiles.length < 186){
    arrfiles.push({"head":"assets/image/page/nianhui/screen/3d_default.jpg","nickname":"网络营销-用户","isEmpty":true});
}