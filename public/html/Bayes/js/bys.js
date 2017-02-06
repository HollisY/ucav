

//function dbclickHandler1(e)
//		{		
	
//		nodeEnter(e);
//		}
//function clickHandler(e)
//		{
	
	
//		$('#BackH').unbind("click",clickHandler);
//		}

function open1()
	{	
		$('.BackGWapper').unbind("mouseup").unbind("mousedown")
    	
		//$('#BackH').unbind("dblclick",dbclickHandler1);
        $('#nodemodal').children('h2')[0].innerHTML='';
		$('#BackH').leanModal({
		top:110,
		overlay:0.45,
		closeButton:".hidemodal"
		
		//
	});


 $("body").eq(0).bind('keydown',function(){if(event.keyCode ==13)
$("#loginbtn").trigger("click");
})
	}

//function open2()
//	{	
//		$('#BackH').bind("dblclick",dbclickHandler1);
//		isdbClick=true;
//	}


function CPT(e,Nodename,StateNum){
 //
  
  var BackG=document.createElement("div");
	 BackG.className="BackG";
	 BackG.id=Nodename;
	 BackG.style.top=e.clientY + scrollY-e.srcElement.offsetTop-e.srcElement.parentNode.offsetTop+"px";
	 BackG.style.left=e.clientX + scrollX-e.srcElement.offsetLeft+"px";
 	 BackG.style.position="absolute";
	 $('#BackH').append(BackG);
     BackG.DataNum=2*StateNum+1;

	 var top=document.createElement("div");
	 top.className="CPTtop";
	 BackG.appendChild(top);
	 top.innerHTML="<a>"+Nodename+'</a>';
$(top).find('a').css({'z-index':-1})

 	var dele=document.createElement("div");
	dele.className="dele";
	top.appendChild(dele);
	dele.innerHTML="×";

    var CPTable=document.createElement("div");
	CPTable.className="CPTable";
	top.appendChild(CPTable);
	CPTable.innerHTML="=";


     var BackGWapper=document.createElement("div");
	 BackGWapper.className="BackGWapper";
	 BackG.appendChild(BackGWapper);
     

for(var k=1;k<=StateNum;k++)
     {var tab1=document.createElement("div");
	 tab1.className="Tab1";
	 BackGWapper.appendChild(tab1);
     tab1.innerHTML="<a>状态"+k+"</a>";
	 var tab2=document.createElement("div");
	 tab2.className="Tab2";
	 BackGWapper.appendChild(tab2);
	 tab2.innerHTML="<a>"+(100/StateNum).toFixed(2)+"</a>";
	}


  //top.addEventListener('mousedown',movediv);
  //BackGWapper.addEventListener('click',Enter);
  //CPTable.addEventListener("click",CPTEnter,false); 
	//dele.addEventListener("click",delet,false);

  nodenum+=1;
  nodeElement.push(Nodename);
  lineMatrix(1,Nodename)
}
	




 function delet(e)
        {if(confirm("确定删除该节点？"))
         {  var BackG=document.createElement("div");     
        // BackH.removeEventListener("click",dbclickHandler1);    
        $(e.srcElement).parents('.BackG').remove()  
         	//e.srcElement.parentNode.parentNode.parentNode.removeChild(e.srcElement.parentNode.parentNode);
          var Nodename1=$(e.srcElement).parents('.BackG').attr('id')
            lineMatrix(3,Nodename1);
        }
        }

 function movediv(e) 
 {                   var obj = $(e.srcElement.parentNode); 
                          obj.css('z-index','9999')
                            var isMove = true;  

                            var abs_x = e.clientX - $(e.srcElement.parentNode).offset().left;                              
                            var abs_y = e.clientY - $(e.srcElement.parentNode).offset().top;  
                           console.log(obj.offset().left,obj.offset().top)
                            console.log(e.clientX,e.clientY)
                            $('#BackH').mousemove(movemove);
                             $('#BackH').mouseup(stopstop);
                            //e.srcElement.addEventListener('mouseout',stopstop);
                            function movemove(e)
                            { 
                              if(isMove){

                               
                                obj.css({'left':e.clientX - obj.parent().offset().left - abs_x, 'top':e.clientY - obj.parent().offset().top - abs_y});  
                                //obj.css({'left':e.clientX - e.srcElement.parentNode.parentNode.offsetLeft - abs_x, 'top':e.clientY - e.srcElement.parentNode.parentNode.offsetTop - e.srcElement.parentNode.parentNode.parentNode.offsetTop - abs_y});
                               linechange($(this).parents('.BackG').attr('id'));
                             
                            }
                        }

                            function stopstop(e)
                            { $('#BackH').unbind('mousemove',movemove);
                            $('#BackH').unbind('mouseup',stopstop);
                              obj.css('z-index','0')
                               isMove=false;
                            }


                            
                    
             
  // body...
 }
 function HelpShow(){
 var doc=document;
 var e=doc.getElementById("HelpDiv");
e.style.visibility="visible";
 }

 function HelpDis()
 { var doc=document;
 var e=doc.getElementById("HelpDiv");
e.style.visibility="hidden";

 }


function Enter(e)
 { 
  $('#Enter').css('visibility','visible');
   var changeflag=0;//改变是否会改变条件概率表
    var Enter=$("#Enter");  
     var wapper=$('<div id="Enter-wapper"></div>')
    Enter.append(wapper);
    var wapper1=$('#Enter-wapper');
  
   var Table1=$(e.srcElement).parents('.BackG');
  
 

   var Table2=$('<table id=Table2 width=100%></table>');
   var arr=$(Table1).find('a');
     var row=Math.floor(arr.length/2);
   var topinner=arr[0].innerText;
   var rows=$('<tr></tr>');
    var td=$('<td class=one width=100% ></td>');
   td.append($("<input type='input' id="+'Entertop'+" value="+topinner+">"));
   rows.append(td); 
   var Table3=$('<table width=100%></table>');

   Table3.append(rows);
   $('#Enter-wapper').append(Table3);

   for (var i=0; i<=row-1; i++) {

    var check1=$('<input type="checkbox" class=checkclass name="Delete" value='+'Delete'+i+'>')

    var rows=$('<tr></tr>');
    var td3=$('<td class=two width=3%></td>');
    var td1=$('<td class=two width=37%></td>');
    var td2=$('<td class=three width=60%></td>');
     td3.append(check1); 
    td1.append($("<input type='input' id="+'row'+i+" value="+arr[i*2+1].innerText+">"));
    td2.append($("<input type='input' id="+'Probability'+i+" value="+arr[i*2+2].innerText+">"));
  rows.append(td3);
   rows.append(td1); 
   rows.append(td2); 

   Table2.append(rows);
   $('#Enter-wapper').append(Table2);
   

   };
   

  $('#Enter-wapper').html($('#Enter-wapper').html()+"<button id=确定><a>确定并保存为证据</a></button>\
                                                   <button id="+"删除"+"><a>删  除</a></button>\
                                                   <button id="+"添加"+"><a>添  加</a></button>\
                                                   <button id="+"关闭"+"><a>关  闭</a></button>\
                                                   <button id="+"删除证据"+"><a>删除证据</a></button>")

$('#确定').click(function (){
  var Prob=$('#Enter').find('[id^=Probability]');
   var row11=Prob.length
  var TableC=$('#Enter-wapper').find('input').not('.checkclass');
   var TableS=$(arr[0]).parents('.BackG').children().find('a');
      
 var thisNode=$(arr[0]).parents('.BackG').attr('id');   

   for(var i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==thisNode)
         {k=i;  break;}
    }
nodeElement[k]=TableC[0].value;
Evidence[k]=new Array();
for(var j=0;j<=row11-1;j++)
{
Evidence[k][j]=Number(Prob[j].value);
}
 $(arr[0]).parents('.BackG').attr('id',TableC[0].value);   
if ($(arr[0]).parents('.BackG').find('.Tab1').length==row11) {changeflag=1;};
 $(arr[0]).parents('.BackG').find('.Tab1').length
 if(TableS.length-1>=row11*2)
   {
    
     for(i=0;i<=row11*2;i++)
    {arr[i].innerText=TableC[i].value;   
    }

    for(i=TableS.length-1;i>=row11*2+1;i--)
    {$(TableS[i]).parent().remove()
     
    }
  }

  else if(TableS.length-1<row11*2)
  {
    for(i=0;i<=TableS.length-1;i++)
    {arr[i].innerText=TableC[i].value;   
    
    }

for(var k=Math.floor(TableS.length/2)+1;k<=row11;k++)
     {var tab1=$('<div class=Tab1></div>')
  // console.log($(TableS[1]).parents('.BackG').children('.BackGWapper'))
  $(TableS[1]).parents('.BackG').children('.BackGWapper').append(tab1);
     tab1[0].innerHTML='<a>'+TableC[2*k-1].value+'</a>';
   var tab2=$('<div class=Tab2></div>')
   $(TableS[1]).parents('.BackG').children('.BackGWapper').append(tab2);
   tab2[0].innerHTML='<a>'+TableC[2*k].value+'</a>';
 //  console.log(TableC[2*k-1].value,TableC[2*k].value,'++++1')  
  }

// console.log(TableS.length,row11*2)
  }
      //$('#Enter').css('visibility','hidden');
      //$('#Enter-wapper').remove();
      if (changeflag==0) 
     linechange1(Table1.parents('.BackG').attr('id'));
      $('#Enter').css('visibility','hidden');
      $('#Enter-wapper').remove();
})

$('#关闭').click(function (){
  
      $('#Enter').css('visibility','hidden');
      $('#Enter-wapper').remove();
    
})

$('#删除').click(function (){
      $('input:checkbox[name=Delete][checked]').parents('tr').remove();
      
})



$('#添加').click(function (){
    
    var row11=$(this).parent().find('[id^=Probability]').length
    var check1=$('<input type="checkbox" class=checkclass name="Delete" value='+'Delete'+i+'>')
    var rows=$('<tr></tr>');
    var td3=$('<td class=two width=3%></td>');
    var td1=$('<td class=two width=37%></td>');
    var td2=$('<td class=three width=60%></td>');
    td3.append(check1); 
    td1.append($("<input type='input' id="+'row'+row11+" value="+'状态'+(row11+1)+">"));
    td2.append($("<input type='input' id="+'Probability'+row11+" value="+'0'+">"));
   rows.append(td3);
   rows.append(td1); 
   rows.append(td2); 
   $('#Table2').append(rows);      
})



$('#删除证据').click(function (){
   var thisNode=$(arr[0]).parents('.BackG').attr('id');   

   for(var i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==thisNode)
         {k=i;  break;}
    }
Evidence[k]=0;

})

var pattern = new RegExp(/(\%)?$/);//正则    未完成



$('[id^=Probability]').keyup(function (){
  this.value = this.value.replace(pattern, '')
        }).bind("paste",function(){  //CTR+V事件处理  
            $(this).val($(this).val().replace(pattern,''));   
        }).css("ime-mode", "disabled"); //CSS设置输入法不可用 });

 /*
 $('#Probability1').keyup(function(){
 alert(1);  
            this.value = this.value.replace(/[^\d]/g, '')
        }).bind("paste",function(){  //CTR+V事件处理  
            $(this).val($(this).val().replace(/[^0-9.]/g,''));   
        }).css("ime-mode", "disabled"); //CSS设置输入法不可用 

*/
 }


