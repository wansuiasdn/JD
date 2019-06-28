check();
function tiao(){location.href='main.html'}
function check()
{
	if($.cookie('data')!=undefined)
	{
		alert("你已登录，自动跳转");
		location.href="main.html"
	}
}
$(".loginbtn").on("click",function(){
	login();
})
function login()
{

	let name = $(".userbox input").val();
	let password = $(".pwdbox input").val();
	$.ajax({
		type:"POST",
		url:"http://47.104.244.134:8080/userlogin.do",
		contentType:"application/x-www-form-urlencoded",
		data:{"name":name,"password":password},
		success:function(msg)
		{
			console.log(msg)
			$.cookie('data',JSON.stringify({"username":name,"password":password,"token":msg.data["token"]}),{ expiress: 0.02 })
			alert("你已登录，自动跳转");
			location.href="main.html"
		},
		error:function(msg)
		{
			console.log(msg)
		}

	})
}
