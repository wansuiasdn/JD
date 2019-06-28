
function tiao(){location.href='main.html'}
$(".userbox input").blur(function(){
	let name = $(".userbox input").val();
	let namecheck = /^[a-z0-9_-]{3,16}$/;
	$.ajax({
		contentType:"application/x-www-form-urlencoded",
		type:"GET",
		url:"http://47.104.244.134:8080/username.do",
		data:{"username":name},
		success:function(res)
		{
			console.log(res.msg)
			if(res.msg=="失败")
			{
				$(".userbox .eq1").css({"display":"block"})
				$(".userbox .eq2").css({"display":"none"})
			}else if(res.msg=="成功"||name.match(namecheck)==null)
			{
				$(".userbox .eq2").css({"display":"block"})
				$(".userbox .eq1").css({"display":"none"})
			}
		},
	})
})
$(".emlbox input").blur(function(){
	let email = $(".emlbox input").val();
	let emlcheck = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
	$.ajax({
		contentType:"application/x-www-form-urlencoded",
		type:"GET",
		url:"http://47.104.244.134:8080/useremail.do",
		data:{"email":email},
		success:function(res)
		{
			
			if(res.msg=="失败")
			{
				$(".emlbox .eq1").css({"display":"block"})
				$(".emlbox .eq2").css({"display":"none"})
			}else if(res.msg=="成功"||email.match(emlcheck)==null)
			{
				$(".emlbox .eq2").css({"display":"block"})
				$(".emlbox .eq1").css({"display":"none"})
			}
		},
	})
})
$(".zcbtn").on("click",function(){
	if($(".userbox .eq1").css("display")=="block" && $(".emlbox .eq1").css("display")=="block")
	{

		let name = $(".userbox input").val();
		let password = $(".pwdbox input").val();
		let email = $(".emlbox input").val();
		let sex = $(".sexbox input:checked").val();
		console.log(sex);

		$.ajax({
		contentType:"application/x-www-form-urlencoded",
		type:"POST",
		url:"http://47.104.244.134:8080/usersave.do",
		data:{"username":name,"password":password,"email":email,"sex":sex},
		success:function(res)
		{
			console.log(res);
			alert("注册成功请登录");
			location.href="login.html";
		},

	})
	}else
	{
		alert('表单中存在错误，请修改！')
	}
	
})