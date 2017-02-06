
function CPTEnter(e)
{var CptNode=$(e.srcElement).parents('.BackG').attr('id');
  var i_th;
  var Nameparent=new Array();
  for(i=0;i<=nodenum-1;i++)
    {if(nodeElement[i]==CptNode)
         {i_th=i;
         break;}

    }

//$('#nodename').find('a').html('aaa')

var parentsNodes_num=eval(Line_Matrix[i_th].join('+'));//父节点数目
var State=new Array((parentsNodes_num+1));//State
var State1=new Array((parentsNodes_num));

length0=$('#'+CptNode).find('.Tab1').length;
State[0]=new Array(length0);
State[0][0]=length0;
for(i=1;i<=length0;i++)
{State[0][i]=$('#'+CptNode).find('.Tab1').find('a')[i-1].innerText;
}

s=0;


for(j=1;j<=parentsNodes_num;j++)
{
while(Line_Matrix[i_th][s]!=1)
{s+=1;}
Nameparent[j-1]=nodeElement[s];
length0=$('#'+nodeElement[s]).find('.Tab1').length;
State[j]=new Array(length0+1);
State[j][0]=length0;
State1[j-1]=new Array(length0);
for(i=1;i<=length0;i++)
{
  State[j][i]=$('#'+nodeElement[s]).find('.Tab1').find('a')[i-1].innerText;
    State1[j-1][i-1]=$('#'+nodeElement[s]).find('.Tab1').find('a')[i-1].innerText;
}
s+=1;
}



var rowss=1;
if (State.length>=2) {
rowss=State[1][0];
if(State.length>=3)
for(i=2;i<=State.length-1;i++)
{rowss*=State[i][0];

}
};

rowss=rowss+1;

var div_length=50*parentsNodes_num+/*$('.cpt_statename').width()*/70*State[0][0];
var divlength=$('<div style=width:'+div_length+'px></div>');
$("#wrapper_cpt_table").append(divlength);


var tablecpt=$('<table></table>');
var rows=$('<tr></tr>');

for(i=0;i<=parentsNodes_num-1;i++)
{
var td=$('<td class=cpt_parentname><a>'+Nameparent[i]+'</a></td>');
rows.append(td);
}
for(i=1;i<=State[0].length-1;i++)
{
var td=$('<td class=cpt_statename><a>'+State[0][i]+'</a></td>');
rows.append(td);
}
tablecpt.append(rows);
//var cptgrid_top=$('<div id=cptgrid_top style=width:'+tablecpt.width()+'px;background:#444;></div>')
//cptgrid_top.append(tablecpt);




var zz=new Array();//状态的笛卡尔集
zz=State1;//此处数组个数任意
var result=new Array();//结果保存到这个数组
function toResult(arrIndex,aresult)
{
 if(arrIndex>=zz.length) {result.push(aresult);return;};
 var aArr=zz[arrIndex];
 if(!aresult) aresult=new Array();
 for(var i=0;i<aArr.length;i++)
 {
   var theResult=aresult.slice(0,aresult.length);
   theResult.push(aArr[i]);
   toResult(arrIndex+1,theResult);
 }
}
toResult(0);



if(parentsNodes_num>=1)
{

    if(CPT_Matrix[i_th]==0)
        {

            for(var i=0;i<=result.length-1;i++)
            {
             var rows=$('<tr></tr>');
              for(var j=0;j<=result[0].length-1;j++)
                {var td=$('<td class=cpt_parentvalue><a>'+result[i][j]+'</a></td>');
                 rows.append(td);
                }
              for(var j=0;j<=State[0][0]-1;j++)
                {var td=$('<td class=cpt_statevalue><a><input type=input></a></td>');
                 rows.append(td);
                }
            tablecpt.append(rows);

        }
      }
    else
      {
      for(var i=0;i<=result.length-1;i++)
        { var rows=$('<tr></tr>');
            for(var j=0;j<=result[0].length-1;j++)
             {var td=$('<td class=cpt_parentvalue><a>'+result[i][j]+'</a></td>');
             rows.append(td);
            }
        for(var j=0;j<=State[0][0]-1;j++)
        {var td=$('<td class=cpt_statevalue><a><input type=input value='+(CPT_Matrix[i_th][i][j])+'></a></td>');
         rows.append(td);
        }
    tablecpt.append(rows);

     }
    }

}

else
{
var rows=$('<tr></tr>');
if(CPT_Matrix[i_th]==0)
   {
    for(var j=0;j<=State[0][0]-1;j++)
    {var td=$('<td class=cpt_statevalue><a><input type=input></a></td>');
     rows.append(td);
    }
  }
else
{ 
  for(var j=0;j<=State[0][0]-1;j++)
    {var td=$('<td class=cpt_statevalue><a><input type=input value='+(CPT_Matrix[i_th][0][j])+'></a></td>');
     rows.append(td);}

}
tablecpt.append(rows);

}

divlength.append(tablecpt);


$('#wrapper_cpt').html($('#wrapper_cpt').html()+"<button id=cpt_确定><a>确  定</a></button>\
                                                <button id=cpt_关闭><a>关  闭</a></button>")

$('#cpt_确定').click(function (){
var inputs=$('#wrapper_cpt_table').find('input');
//(result[0]!=undefined)
//{

CPT_Matrix[i_th]=new Array(result.length)
for(var i=0;i<=result.length-1;i++)
{CPT_Matrix[i_th][i]=new Array(State[0][0])
 for(var j=0;j<=State[0][0]-1;j++)
  {CPT_Matrix[i_th][i][j]=Number(inputs[i*State[0][0]+j].value)

  }
 //}
}
//se
//
 //PT_Matrix[i_th]=new Array(1)
 //PT_Matrix[i_th][0]=new Array(3)
//for(var i=0;i<=State[0][0]-1;i++)
//PT_Matrix[i_th][0][0]=inputs[0].value}
//
$('#cpt_关闭').trigger("click");


})


$('#cpt_关闭').click(function (){
    $("#lean_overlay").fadeOut(200);
            $("body").eq(0).unbind('keydown');
        $("#wrapper_cpt_table").html(''); 
        $("#wrapper_cpt").css({"display":"none"})
        $('#cpt_确定').remove();
        $('#cpt_关闭').remove();
})
/*
//console.log(Math.min(cptgrid_top.width(),700))
if(State.length-1!=0)
{var parentsnode_name=$('<div style=width:'+(50*(State.length-1))+'px;background:#333;float:left;>aaa</div>')
cptgrid_top.append(parentsnode_name);
}
var state_name=$('<div style=width:'+70*State[0][0]+'px;background:#555;float:left;>aaa</div>')

cptgrid_top.append(state_name);
alert(rowss)

var table_wrapper=$('<div id=table_wrapper></div>')
$("#table_wrapper").css({'width':Math.min(cptgrid_top.width(),1200)+'px','height':Math.min(21*rowss-21+8,500)+'px'}).append(cptgrid_top);
$("#wrapper_cpt_table").append(table_wrapper);

if(rowss>=3)

{var parents_wrapper=$('<div id=parents_wrapper style=width:'+(50*(State.length-1))+'px;float:left;>bbb</div>');
$("#table_wrapper").append(parents_wrapper);}

var cptgrid_wrapper=$('<div id=cptgrid_wrapper style=width:'+70*State[0][0]+'px;height:'+(21*rowss-21)+'px;background:#666;>ccc</div>');
$("#table_wrapper").append(cptgrid_wrapper);


*/














$("#lean_overlay").css({"display":"block"});
$("#lean_overlay").fadeTo(200,0.5);
//$("#lean_overlay").click(function(){
        //   $("#lean_overlay").css('display','none');
      //      $("#wrapper_cpt_table").css('display','none');
      //    });
var modal_width=$('#wrapper_cpt').width();
$('#wrapper_cpt').css({"display":"block","opacity":0,"z-index":110000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":100+"px"});
$('#wrapper_cpt').fadeTo(200,1);




        var $el = $('#wrapper_cpt_table').jScrollPane({
          verticalGutter  : -16
        }),
            
        // the extension functions and options  
          extensionPlugin   = {
            
            extPluginOpts : {
              // speed for the fadeOut animation
              mouseLeaveFadeSpeed : 500,
              // scrollbar fades out after hovertimeout_t milliseconds
              hovertimeout_t    : 1000,
              // if set to false, the scrollbar will be shown on mouseenter and hidden on mouseleave
              // if set to true, the same will happen, but the scrollbar will be also hidden on mouseenter after "hovertimeout_t" ms
              // also, it will be shown when we start to scroll and hidden when stopping
              useTimeout      : false,
              // the extension only applies for devices with width > deviceWidth
              deviceWidth     : 980
            },
            hovertimeout  : null, // timeout to hide the scrollbar
            isScrollbarHover: false,// true if the mouse is over the scrollbar
            elementtimeout  : null, 
            isScrolling   : false,
            addHoverFunc  : function() {
        

              if( $(window).width() <= this.extPluginOpts.deviceWidth ) return false;
              
              var instance    = this;

              $.fn.jspmouseenter  = $.fn.show;
              $.fn.jspmouseleave  = $.fn.fadeOut;

              var $vBar     = this.getContentPane().siblings('.jspVerticalBar').hide();
              
              $el.bind('mouseenter.jsp',function() {

                $vBar.stop( true, true ).jspmouseenter();
                
                if( !instance.extPluginOpts.useTimeout ) return false;
 
                clearTimeout( instance.hovertimeout );
                instance.hovertimeout   = setTimeout(function() {

                  if( !instance.isScrolling )
                    $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                }, instance.extPluginOpts.hovertimeout_t );
                
                
              }).bind('mouseleave.jsp',function() {
 
                if( !instance.extPluginOpts.useTimeout )
                  $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                else {
                clearTimeout( instance.elementtimeout );
                if( !instance.isScrolling )
                    $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                }
                
              });
              
              if( this.extPluginOpts.useTimeout ) {
                
                $el.bind('scrollstart.jsp', function() {
       
                  clearTimeout( instance.hovertimeout );
                  instance.isScrolling  = true;
                  $vBar.stop( true, true ).jspmouseenter();
                  
                }).bind('scrollstop.jsp', function() {
        
                  clearTimeout( instance.hovertimeout );
                  instance.isScrolling  = false;
                  instance.hovertimeout   = setTimeout(function() {
                    if( !instance.isScrollbarHover )
                      $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                  }, instance.extPluginOpts.hovertimeout_t );
                  
                });
       
                var $vBarWrapper  = $('<div/>').css({
                  position  : 'absolute',
                  left    : $vBar.css('left'),
                  top     : $vBar.css('top'),
                  right   : $vBar.css('right'),
                  bottom    : $vBar.css('bottom'),
                  width   : $vBar.width(),
                  height    : $vBar.height()
                }).bind('mouseenter.jsp',function() {
                  
                  clearTimeout( instance.hovertimeout );
                  clearTimeout( instance.elementtimeout );                  
                  instance.isScrollbarHover = true;                                
                  instance.elementtimeout = setTimeout(function() {
                    $vBar.stop( true, true ).jspmouseenter();
                  }, 100 );                   
                }).bind('mouseleave.jsp',function() {                  
                  clearTimeout( instance.hovertimeout );
                  instance.isScrollbarHover = false;
                  instance.hovertimeout = setTimeout(function() {                 
                    if( !instance.isScrolling )
                      $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                  }, instance.extPluginOpts.hovertimeout_t );                  
                });                
                $vBar.wrap( $vBarWrapper );              
              }
            }            
          },       
         jspapi      = $el.data('jsp');
        $.extend( true, jspapi, extensionPlugin );
        jspapi.addHoverFunc();

}
