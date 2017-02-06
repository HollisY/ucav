function saveBayes(){
saveNet={
nodenum:nodenum,
nodeElement:nodeElement.slice(0),
Line_Matrix:Line_Matrix.slice(0),
CPT_Matrix:CPT_Matrix.slice(0),
Nethtml:$('#BackH').html(),
}

console.log(saveNet);
$.ajax(
{type:'post',
url:'http://192.168.1.255:3000/client',
data:saveNet,
dataType: 'jsonp',
jsonp: 'callback',
success:function(data){
alert('网络保存成功！')
}





})
}
