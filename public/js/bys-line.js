//$(document).ready(function(){
var saveNet;
var mousedownObj;
var mouseupObj;
var nodenum=0;
var nodeElement=new Array();
var Line_Matrix=new Array();
var CPT_Matrix=new Array();
var Evidence=new Array();

function lineclick()
{
    var mousedownXY;
    var mouseupXY;
   // $('#BackH').unbind("dblclick",dbclickHandler1);
   // $('#BackH').unbind('click')
    $(".BackGWapper").mousedown(function () {
      mousedownXY=getMousePos(event);//记录鼠标位置
      mousedownObj=$(this).parent().attr("id");
    }).mouseup(function() {
      mouseupXY=getMousePos(event);
      mouseupObj=$(this).parent().attr("id");
      if(mouseupObj!=mousedownObj)
      {draw(mousedownObj,mouseupObj);
//draw1(mousedownXY,mouseupXY) 
      }
      })

}

function lineMatrix(switcher,Nodename,mousedownObj,mouseupObj)
{
 if (switcher==1){//增加节点时改变矩阵

  CPT_Matrix[nodenum-1]=new Array();
  var Line_Matrix1=new Array();
  for (var i=0;i<=nodenum-1;i++) {
    Line_Matrix1[i]=new Array();
  for (var j=0;j<=nodenum-1;j++) {
    if(i<=nodenum-2&&j<=nodenum-2)
    {Line_Matrix1[i][j]=Line_Matrix[i][j];}
    else
     {

      Line_Matrix1[i][j]=0;
      }
  };
};
Line_Matrix=Line_Matrix1;
Evidence.push(0)

}
  else if(switcher==2)//连线时改变表示连接状态
  {var Source;
    var Target;

    for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source=i;
           else if(nodeElement[i]==mouseupObj)
            Target=i;
    }
  //  console.log(Source,Target,mouseupObj,mousedownObj,nodeElement[0])
    Line_Matrix[Target][Source]=1;
     CPT_Matrix[Target]=new Array();
}

else if(switcher==3)//删除接电视删除相关
{var k;
   for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==Nodename)
         k=i;  
    }

nodenum-=1;
nodeElement.splice(k,1)
Line_Matrix.splice(k,1)
CPT_Matrix.splice(k,1);
Evidence.splice(k,1);
 for(i=0;i<=nodenum-1;i++)
    {Line_Matrix[i].splice(k,1);
    if(i!=nodenum-1)
    {if (Line_Matrix[i][k]==1)
       CPT_Matrix[i]=new Array();

    }
    }

  var patt= new RegExp(Nodename,'g');
  var lineid;
  var k1=null;
  
    $('[id^=line_]').each(function(){ 
      k1=patt.exec($(this).attr('id'));
      if (k1!=null) {$(this).remove();patt.lastIndex=0;};
      k1=null;
})
  
  

}

else if(switcher==4)//删除连线删除相关
{var Source;
    var Target;
    for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source=i;
           else if(nodeElement[i]==mouseupObj)
            Target=i;
    }

    Line_Matrix[Target][Source]=0;
    CPT_Matrix[Target]=new Array(); 
}
  else if(switcher==5)//其他连线的改变时  移动，等 
  {var Source;
    var Target;
    for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source=i;
           else if(nodeElement[i]==mouseupObj)
            Target=i;
    }
     Line_Matrix[Target][Source]=1;
  //  console.log(Source,Target,mouseupObj,mousedownObj,nodeElement[0])
}

}





function getMousePos(event) 
{
 var e = event || window.event;
 return {'x':e.pageX,'y':e.pageY}
}

function draw1(mousedownObj,mouseupObj)
{

 for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source=i;
           else if(nodeElement[i]==mouseupObj)
            Target=i;
    }
if(Line_Matrix[Target][Source]==1||Line_Matrix[Source][Target]==1)
  return;

var SourceObj=$('#'+mousedownObj+'.BackG');
var TargetObj=$('#'+mouseupObj+'.BackG');
var linename='line_'+mousedownObj+'_'+mouseupObj

var mousedownXY={'x':$(SourceObj).offset().left+($(SourceObj).width())/2-1,'y':$(SourceObj).offset().top+($(SourceObj).height())/2-6}
var mouseupXY={'x':$(TargetObj).offset().left+($(TargetObj).width())/2-1,'y':$(TargetObj).offset().top+($(TargetObj).height())/2-6}
console.log(mousedownXY,mouseupXY)
var width1=Math.sqrt(Math.pow(mousedownXY.x-mouseupXY.x,2)+Math.pow(mousedownXY.y-mouseupXY.y,2));//鼠标按下和松开之间距离
if(mousedownXY.x-mouseupXY.x<=0)
  {
    var angel1=Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))//角 弧度制
    var angel=Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))*180/Math.PI;//角  角度制
  }
else{
  var angel1=Math.PI+Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))
  var angel=180+Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))*180/Math.PI;}
  if (angel==90||angel==-90)
    { angel=-angel;
      angel1=-angel1;
    }


  var S_angle=(Math.atan($(SourceObj).height()/$(SourceObj).width()))*180/Math.PI;
  var T_angle=(Math.atan($(TargetObj).height()/$(TargetObj).width()))*180/Math.PI;

  var S_Side1;
  var T_Side1;
  if (0<angel&&angel<90) {S_Side1=['right','bottom']; T_Side1=['left','top']}
    else if(90<=angel&&angel<180) {S_Side1=['bottom','left'];T_Side1=['top','right'];}
    else if(180<=angel&&angel<270) {S_Side1=['left','top'];T_Side1=['right','bottom'];}
    else if(-90<=angel&&angel<=-0) {S_Side1=['top','right'];T_Side1=['bottom','left'];}
  var S_Side2;
  var T_Side2;

  var angel90;
  if (0<=Math.abs(angel)&&Math.abs(angel)<=90) angel90=Math.abs(angel);
  else if(0<=Math.abs(angel-180)&&Math.abs(angel-180)<=90) angel90=Math.abs(angel-180);
  
   if (angel90>=S_angle) S_Side2=['bottom','top']; else S_Side2=['left','right'];
   if (angel90>=T_angle) T_Side2=['bottom','top']; else T_Side2=['left','right'];
  var S_Side;
   var T_Side;

    
  var hash = {}; 
for(var i=0,max=S_Side1.length; i<max; i++) { 
var obj = {}; 
hash[S_Side1[i]] = true; 
} 
// 通过hash检测b数组中的元素 
for(var i=0, max=S_Side2.length; i<max; i++) { 
if(typeof hash[S_Side2[i]] !== "undefined") { 
  S_Side=S_Side2[i]
} 
}

var hash = {}; 
for(var i=0,max=T_Side1.length; i<max; i++) { 
var obj = {}; 
hash[T_Side1[i]] = true; 
} 
// 通过hash检测b数组中的元素 
for(var i=0, max=T_Side2.length; i<max; i++) { 
if(typeof hash[T_Side2[i]] !== "undefined") { 
  T_Side=T_Side2[i]
} 
}


//console.log(S_Side,T_Side)
var dwidth1;
var dwidth2;
switch(S_Side)
{case 'bottom':
case 'top':
    dwidth1=SourceObj.height()/2/Math.abs(Math.sin(angel1));
 break;
 case 'left':
 case 'right':
    dwidth1=SourceObj.width()/2/Math.abs(Math.cos(angel1));
}

switch(T_Side)
{case 'bottom':
case 'top':
    dwidth2=TargetObj.height()/2/Math.abs(Math.sin(angel1));
 break;
 case 'left':
  case 'right':
    dwidth2=TargetObj.width()/2/Math.abs(Math.cos(angel1));
}

dwidth=dwidth1+dwidth2;
var dXY={x:null,y:null};
/**switch(S_Side[0])
{case 'right':dXY.x=SourceObj.width();dXY.y=SourceObj.height break;
case 'bottom':alert(2); break;
case 'left':alert(3); break;
case 'top':alert(4); break;
}
**/
dXY.x=dwidth1*Math.cos(angel1);
dXY.y=dwidth1*Math.sin(angel1);
//console.log(dXY.x,dXY.y)


    var dx=0.5*(width1-dwidth)*(1-Math.cos(angel1));//偏移  div旋转是以中心位置为中心旋转 旋转后角位置会有变化
    var dy=0.5*(width1-dwidth)*Math.sin(angel1);

    if(width1>0){
    var line1=$('<div class=linewrapper id='+linename+'></div>')
     line1.css('-webkit-transform','rotate('+angel+'deg)').css('top',mousedownXY.y+dXY.y+dy-$('#BackH').offset().top).css('left',mousedownXY.x+dXY.x-dx-$('#BackH').offset().left).css('z-index','-1');//设置线条长度 角度 以及偏移
    
    //line1.css('top',mousedownXY.y-$('#BackH').offset().top).css('left',mousedownXY.x-$('#BackH').offset().left).css('z-index','222');//设置线条长度 角度 以及偏移
    $("#BackH").append(line1);
    var line2=$("<div class=line></div>")
    var arrow=$("<div class=arrow></div>")
    line1.append(line2);
    line1.append(arrow);
    line2.css('width',width1-dwidth-5+'px');
    lineMatrix(5,0,mousedownObj,mouseupObj);
    }
   line1.click(function() {
    var lineid=$(this).attr('id');
    var patt= new RegExp('_','g');
    var k1;
    var k2;
   patt.exec(lineid);
   k1=patt.lastIndex;
   patt.exec(lineid);
   k2=patt.lastIndex;
    
   var Source;
   var Target;
   Source=lineid.substring(k1,k2-1)
   Target=lineid.substring(k2);
   lineMatrix(4,0,Source,Target);
   $(this).remove();
    })
}



function draw(mousedownObj,mouseupObj)
{

 for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source=i;
           else if(nodeElement[i]==mouseupObj)
            Target=i;
    }
if(Line_Matrix[Target][Source]==1||Line_Matrix[Source][Target]==1)
  return;

var SourceObj=$('#'+mousedownObj+'.BackG');
var TargetObj=$('#'+mouseupObj+'.BackG');
var linename='line_'+mousedownObj+'_'+mouseupObj

var mousedownXY={'x':$(SourceObj).offset().left+($(SourceObj).width())/2-1,'y':$(SourceObj).offset().top+($(SourceObj).height())/2-6}
var mouseupXY={'x':$(TargetObj).offset().left+($(TargetObj).width())/2-1,'y':$(TargetObj).offset().top+($(TargetObj).height())/2-6}
console.log(mousedownXY,mouseupXY)
var width1=Math.sqrt(Math.pow(mousedownXY.x-mouseupXY.x,2)+Math.pow(mousedownXY.y-mouseupXY.y,2));//鼠标按下和松开之间距离
if(mousedownXY.x-mouseupXY.x<=0)
  {
    var angel1=Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))//角 弧度制
    var angel=Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))*180/Math.PI;//角  角度制
  }
else{
  var angel1=Math.PI+Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))
  var angel=180+Math.atan((mousedownXY.y-mouseupXY.y)/(mousedownXY.x-mouseupXY.x))*180/Math.PI;}
  if (angel==90||angel==-90)
  	{ angel=-angel;
      angel1=-angel1;
  	}


  var S_angle=(Math.atan($(SourceObj).height()/$(SourceObj).width()))*180/Math.PI;
  var T_angle=(Math.atan($(TargetObj).height()/$(TargetObj).width()))*180/Math.PI;

  var S_Side1;
  var T_Side1;
  if (0<angel&&angel<90) {S_Side1=['right','bottom']; T_Side1=['left','top']}
  	else if(90<=angel&&angel<180) {S_Side1=['bottom','left'];T_Side1=['top','right'];}
  	else if(180<=angel&&angel<270) {S_Side1=['left','top'];T_Side1=['right','bottom'];}
  	else if(-90<=angel&&angel<=-0) {S_Side1=['top','right'];T_Side1=['bottom','left'];}
  var S_Side2;
  var T_Side2;

  var angel90;
  if (0<=Math.abs(angel)&&Math.abs(angel)<=90) angel90=Math.abs(angel);
  else if(0<=Math.abs(angel-180)&&Math.abs(angel-180)<=90) angel90=Math.abs(angel-180);
  
   if (angel90>=S_angle) S_Side2=['bottom','top']; else S_Side2=['left','right'];
   if (angel90>=T_angle) T_Side2=['bottom','top']; else T_Side2=['left','right'];
  var S_Side;
   var T_Side;

    
  var hash = {}; 
for(var i=0,max=S_Side1.length; i<max; i++) { 
var obj = {}; 
hash[S_Side1[i]] = true; 
} 
// 通过hash检测b数组中的元素 
for(var i=0, max=S_Side2.length; i<max; i++) { 
if(typeof hash[S_Side2[i]] !== "undefined") { 
  S_Side=S_Side2[i]
} 
}

var hash = {}; 
for(var i=0,max=T_Side1.length; i<max; i++) { 
var obj = {}; 
hash[T_Side1[i]] = true; 
} 
// 通过hash检测b数组中的元素 
for(var i=0, max=T_Side2.length; i<max; i++) { 
if(typeof hash[T_Side2[i]] !== "undefined") { 
  T_Side=T_Side2[i]
} 
}


//console.log(S_Side,T_Side)
var dwidth1;
var dwidth2;
switch(S_Side)
{case 'bottom':
case 'top':
    dwidth1=SourceObj.height()/2/Math.abs(Math.sin(angel1));
 break;
 case 'left':
 case 'right':
    dwidth1=SourceObj.width()/2/Math.abs(Math.cos(angel1));
}

switch(T_Side)
{case 'bottom':
case 'top':
    dwidth2=TargetObj.height()/2/Math.abs(Math.sin(angel1));
 break;
 case 'left':
  case 'right':
    dwidth2=TargetObj.width()/2/Math.abs(Math.cos(angel1));
}

dwidth=dwidth1+dwidth2;
var dXY={x:null,y:null};
/**switch(S_Side[0])
{case 'right':dXY.x=SourceObj.width();dXY.y=SourceObj.height break;
case 'bottom':alert(2); break;
case 'left':alert(3); break;
case 'top':alert(4); break;
}
**/
dXY.x=dwidth1*Math.cos(angel1);
dXY.y=dwidth1*Math.sin(angel1);
//console.log(dXY.x,dXY.y)


    var dx=0.5*(width1-dwidth)*(1-Math.cos(angel1));//偏移  div旋转是以中心位置为中心旋转 旋转后角位置会有变化
    var dy=0.5*(width1-dwidth)*Math.sin(angel1);

    if(width1>0){
    var line1=$('<div class=linewrapper id='+linename+'></div>')
     line1.css('-webkit-transform','rotate('+angel+'deg)').css('top',mousedownXY.y+dXY.y+dy-$('#BackH').offset().top).css('left',mousedownXY.x+dXY.x-dx-$('#BackH').offset().left).css('z-index','-1');//设置线条长度 角度 以及偏移
    
    //line1.css('top',mousedownXY.y-$('#BackH').offset().top).css('left',mousedownXY.x-$('#BackH').offset().left).css('z-index','222');//设置线条长度 角度 以及偏移
    $("#BackH").append(line1);
    var line2=$("<div class=line></div>")
    var arrow=$("<div class=arrow></div>")
    line1.append(line2);
    line1.append(arrow);
    line2.css('width',width1-dwidth-5+'px');
    lineMatrix(2,0,mousedownObj,mouseupObj);
    }
   line1.click(function() {
    var lineid=$(this).attr('id');
    var patt= new RegExp('_','g');
    var k1;
    var k2;
   patt.exec(lineid);
   k1=patt.lastIndex;
   patt.exec(lineid);
   k2=patt.lastIndex;
    
   var Source;
   var Target;
   Source=lineid.substring(k1,k2-1)
   Target=lineid.substring(k2);
   lineMatrix(4,0,Source,Target);
   $(this).remove();
    })
}



function linechange(Nodename)
{
  var patt= new RegExp(Nodename,'g');
  var k1=null;
  var t1,t2;
    $('[id^=line_]').each(function(){ 
     
      var lineidid=$(this).attr('id')
      k1=patt.exec(lineidid);
      if (k1!=null) {
      //patt.lastIndex=0;//重新找
      var patt1= new RegExp('_','g');
      patt1.exec(lineidid)
        t1=patt1.lastIndex;
        patt1.exec(lineidid);
        t2=patt1.lastIndex;
        mousedownObj=lineidid.substring(t1,t2-1)
        mouseupObj=lineidid.substring(t2);
    
    var Source1;
    var Target1;
    //console.log(lineidid,mousedownObj,mouseupObj)     

    for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source1=i;
           else if(nodeElement[i]==mouseupObj)
            Target1=i;
    }
    Line_Matrix[Target1][Source1]=0;
    for(var i=0;i<=nodenum-1;i++)
{//console.log(Line_Matrix[i])

}
//console.log('__after___')
  // console.log(Source,Target,'+++++')

         $(this).remove();
        draw1(mousedownObj,mouseupObj);
        
        patt.lastIndex=0;};
      k1=null;
      t1=0;
      t2=0;

})   
}

function linechange1(Nodename)
{
  var patt= new RegExp(Nodename,'g');
  var k1=null;
  var t1,t2;
    $('[id^=line_]').each(function(){ 
     
      var lineidid=$(this).attr('id')
      k1=patt.exec(lineidid);
      if (k1!=null) {
      //patt.lastIndex=0;//重新找
      var patt1= new RegExp('_','g');
      patt1.exec(lineidid)
        t1=patt1.lastIndex;
        patt1.exec(lineidid);
        t2=patt1.lastIndex;
        mousedownObj=lineidid.substring(t1,t2-1)
        mouseupObj=lineidid.substring(t2);
    
    var Source1;
    var Target1;
    //console.log(lineidid,mousedownObj,mouseupObj)     

    for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==mousedownObj)
           Source1=i;
           else if(nodeElement[i]==mouseupObj)
            Target1=i;
    }
    Line_Matrix[Target1][Source1]=0;
    for(var i=0;i<=nodenum-1;i++)
{//console.log(Line_Matrix[i])

}
//console.log('__after___')
  // console.log(Source,Target,'+++++')

         $(this).remove();
        draw1(mousedownObj,mouseupObj);
        
        patt.lastIndex=0;};
      k1=null;
      t1=0;
      t2=0;

})   
}