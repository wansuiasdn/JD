
var pagenum = 2;
function zhuce(){location.href='register.html'}
function gwc(){location.href='cart.html'}
window.onload=function()
{
	$(document).scrollTop(0)
}
$(document).scroll(function(){
	if($(document).scrollTop()>=600)
	{
		$(".topsearch").slideDown("normal")
	}else
	{
		$(".topsearch").hide()
	}
	if ($(document).scrollTop() >= $(document).height() - $(window).height()-890)
	{
		if (pagenum<=6) 
		{
			$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/goodsbytid.do",
			data:{tid:13,page:pagenum,limit:20},
			success:function(res)
			{
				console.log(res)
				for(i=0;i<res.data.length;i++)
				{
					let price = res.data[i].price/100
					$(".more2 ul").append(`
					<li>
						<p><img src="http:${res.data[i].picurl}"></p>
							<div>
								<p>${res.data[i].name}</p>
								<div>
									<div>
										<i>￥</i>
										<span>${price}</span>
									</div>
								</div>
							</div>
						</li>
					`)
				}
				pagenum++;

			},error:function(res)
			{
				console.log(res)
			}
		})
		}

	}

})
if($.cookie('data')==undefined)
{
	user = {"username":"未登录"}
	$(".ulr li:nth-of-type(1)").html(`<a href="login.html">${user.username}</a>`)
	$(".usershow p").append(`<span>${user.username}</span>`)
	$('.num').html(0)
}else
{
	let otoken=JSON.parse($.cookie('data')).token
	let user = JSON.parse($.cookie('data'));
	$(".ulr li:nth-of-type(1)").html(`<span>${user.username}</span>`)
	$(".usershow p").append(`<span>${user.username}</span>`)
	$(".usershow a").css({"display":"none"})
	$(".usershow").append(`<a class="exit" href="login.html">退出</a>`)
	// 请求购物车数据
	$.ajax({
			url:'http://47.104.244.134:8080/cartlist.do',
			type:'get',
			data:{token:otoken},
			success:function(res){
				console.log(res)
				// 购物车赋值
				$('.num').html(res.length)
			},
			error:function(res){
				
			}
		})
}
$(".exit").on("click",function(){
	$.cookie('data',"",{expires:-1})
	alert("已退出！")
})
function prolist()
{
	// $.get("http://47.104.244.134:8080/goodstypelist.do",{l:1}).done(data=>{console.log(data)})
	$.ajax({
		type:"get",
		url:"prolist.json",
		async:false,
		dataType:"json",
		success:function(res)
		{
			console.log(res)
			for(i=0;i<res.data.length;i++)
			{

				$(".fs1 ul").append(`
				<li data-id=${i}>${res.data[i].list1}</li>
				`)
			}

			$(".fs1 ul li").hover(function()
			{
				let id = $(this).attr("data-id");

				$('.catein').empty();
				$('.detail').empty();
				$('.popCtn').css({"display":"block"});
				$('.popCtn').hover(function()
				{
					$('.popCtn').css({"display":"block"});
				})
				for(j=0;j<res.data[id].list2top.length;j++)
				{
					$('.catein').append(`
						<span>${res.data[id].list2top[j].topname}</span>
						`)
				}
				for(k=0;k<res.data[id].list2left.length;k++)
				{
					$('.detail').append(
						`<dl><dt><span>${res.data[id].list2left[k].leftname}</span></dt><dd></dd></dl>`
						)
					for(l=0;l<res.data[id].list2left[k].list3.length;l++)
					{

							$('.detail dl:eq('+k+') dd').append(`
							<span>${res.data[id].list2left[k].list3[l].list3name}</span>
						`)
	
					}

				}
			},function()
			{
				if($(this)!=$('.phpCtn'))
				{
					$('.popCtn').css({"display":"none"})
				}
				$('.popCtn').mouseleave(function(){
					$('.popCtn').css({"display":"none"})
				})
				
			}
			)
			
		},error:function(data)
		{
			console.log(data)
		}
	})
}
prolist()
// 上移页面
$('.toolbarfooter div').on("click",function(){
	$(document).scrollTop(0)
})
$.ajax({
	type:"get",
	url:"http://47.104.244.134:8080/goodsbytid.do",
	data:{tid:13,page:1,limit:20},
	success:function(res)
	{
		console.log(res)
		for(let i=0;i<res.data.length;i++)
		{
			$(".more2 ul").append(`
			<li data-id=${res.data[i].id}>
				<p><img src="http:${res.data[i].picurl}"></p>
					<div>
						<p>${res.data[i].name}</p>
						<div>
							<div>
								<i>￥</i>
								<span>${res.data[i].price/100}</span>
							</div>
						</div>
					</div>
				</li>
			`)
			$('.more2 ul li').on("click",function(){
				location.href='detail.html?'+$(this).attr('data-id')
			})

		}

	},error:function(res)
	{
		console.log(res)
	}
})

