
 $("#_read").click(function(){
 	alert(1)
htmlobj=$.ajax({url:"/json/result.json",async:false})
console.log(htmlobj.responseText)
 })
