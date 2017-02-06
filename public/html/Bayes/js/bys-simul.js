var nodesizes =new Array();

function simulate(){
	for(var i=0;i<=nodenum-1;i++)
{
length0=$('#'+nodeElement[i]).find('.Tab1').length;
nodesizes.push(length0)
}

var jsonobj={
	'timestamp':'',
	'nodenum':nodenum,
	'tasktype':'Bayes',
	'dag':Line_Matrix,
	'Evidence':{},
	'nodesizes':nodesizes.slice(0),
	'CPT':{},
	state:'data'

}
var Stamp=new Date().getTime();
Stamp=Stamp.toString();
jsonobj['timestamp']=Stamp;
nodesizes=[];

for(var i=0;i<=nodenum-1;i++)
{   var aa='Evidence'+(i+1)
	jsonobj.Evidence[aa]=Evidence[i];

}

for(var i=0;i<=nodenum-1;i++)
{   var aa='node'+(i+1)
    if(CPT_Matrix[i].length==0)
    jsonobj.CPT[aa]=0;
else 
	jsonobj.CPT[aa]=CPT_Matrix[i];

}
var xx=3;
//console.log(JSON.stringify(jsonobj));
/*
jsonresult={
	"nodenum": 6,
	"tasktype": "Bayes",
	"dag": [
		[0,0,0,0,0,0],
		[1,0,0,0,0,0],
		[1,0,0,0,0,0],
		[0,1,0,0,0,0],
		[0,1,0,0,0,0],
		[0,0,1,0,0,0]
	],
	"Evidence": {
		"Evidence1": 0,
		"Evidence2": 0,
		"Evidence3": 0,
		"Evidence4": [50,50],
		"Evidence5": [60,40],
		"Evidence6": [30,70]
	},
	"nodesizes": [2,2,2,2,2,2],
	"CPT": {
		"node1": [60,40],
		"node2": [
			[50,50],
			[60,40]
		],
		"node3": [
			[30,70],
			[90,10]
		],
		"node4": [
			[30,70],
			[60,40]
		],
		"node5": [
			[60,40],
			[33,67]
		],
		"node6": [
			[12,88],
			[66,34]
		]
	},
	"output": {
		"Probability": {
			"node1": [
				[54.10135401],
				[45.89864599]
			],
			"node2": [
				[57.26485398],
				[42.73514602]
			],
			"node3": [
				[63.85482446],
				[36.14517554]
			],
			"node4": [
				[42.82054381],
				[57.17945619]
			],
			"node5": [
				[57.80275065],
				[42.19724935]
			],
			"node6": [
				[19.9402787],
				[80.0597213]
			]
		}
	}
}



//console.log(JSON.stringify(jsonresult));

//console.log(jsonresult.Probability.node1);


var nodess=$('#BackH').find('.BackG');
for(var i=0;i<=nodenum-1;i++)
{
	if(Evidence[i]==0)
	{var aa = $(nodess[i]).find('.Tab2');
console.log(aa.length);

     for(var j=0;j<=aa.length-1;j++)
    {  
    	value=jsonresult.output.Probability['node'+(i+1)][j][0].toFixed(2);
         //console.log(value)
    	$(aa[j]).html('<a>'+value+'%</a>')
    
     }
     }

	}

*/


$.ajax({
	type:'POST',
	url:'http://192.168.1.103:3000/client',
	data:jsonobj,
	dataType: 'jsonp',
	jsonp: 'callback',

	success:function(data){
		var count=0;

		var intervalNum=setInterval(function(){
			$.ajax({
				type:'POST',
				url:'http://192.168.1.103:3000/client',
				data:{state:'check',},
				dataType: 'jsonp',
				jsonp: 'callback',
				success:function(data){
					console.log(data)
					//if(count==5){
					if(data.output.Probability){
						clearInterval(intervalNum);
						
						ResPrint(data);
					}
				}
			});	
		},400);





}
})

function ResPrint(data)
{
console.log(data);
	var nodess=$('#BackH').find('.BackG');
	for(var i=0;i<=nodenum-1;i++)
{
	if(Evidence[i]==0)
	{var aa = $(nodess[i]).find('.Tab2');
console.log(aa.length);

     for(var j=0;j<=aa.length-1;j++)
    {  
    	value=data.output.Probability['node'+(i+1)][j][0].toFixed(2);
         //console.log(value)
    	$(aa[j]).html('<a>'+value+'</a>')
    
     }
     }

	}}
console.log(JSON.stringify(jsonobj))
}

