function readBayes()
{


var data=saveNet;

$.ajax(
{type:'post',
url:'http://192.168.1.255:3000/client',
data:saveNet,
dataType: 'jsonp',
jsonp: 'callback',
success:function(data){
$('#BackH').html(data.Nethtml);
nodenum=data.nodenum;
nodeElement=data.nodeElement;
Line_Matrix=data.Line_Matrix;
CPT_Matrix=data.CPT_Matrix;
}
})

$('#BackH').html(data.Nethtml);
nodenum=data.nodenum;

nodeElement=data.nodeElement.slice(0);
Line_Matrix=data.Line_Matrix.slice(0);
CPT_Matrix=data.CPT_Matrix.slice(0);

}
