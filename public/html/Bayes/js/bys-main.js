$(document).ready(function(){



$('#HelpDiv')[0].innerHTML='\
            <ul>\
			<li>XXXXXXXXX</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li></li>\
			<li>XXXXXXXXX</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li></li>\
			<li>XXXXXXXXX</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li></li>\
			<li>XXXXXXXXX</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
			<li></li>\
			<li>XXXXXXXXX</li>\
			<li>xxxxxxxx</li>\
			<li>xxxxxx</li>\
		</ul>'
$('#Readme').mouseover(HelpShow).mouseout(HelpDis);
 $('#_node').click(open1);
 $('#_link').click(lineclick);
 $('#_simulate').click(simulate);
  $('#_save').click(saveBayes);
    $('#_read').click(readBayes);
 $('#BackH').click(function(){
 	if(event.target.className=='dele'){delet(event)}
 		else if(event.target.className=='CPTable'){CPTEnter(event)}
 			else if($(event.srcElement).parents('.BackGWapper').length!=0){Enter(event)}

 })
  $('#BackH').mousedown(function(){
 	if(event.target.className=='CPTtop'){movediv(event)}
 
 })
})