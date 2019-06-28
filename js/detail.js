console.log(window.location.search)
function gwc(){location.href='cart.html'}
var oid = window.location.search.substring(1)
$.ajax({
	url:'http://47.104.244.134:8080/goodsbyid.do',
	type:'get',
	data:{id:oid},
	success:function(res)
	{
		console.log(res)
		$('.namebox').html(res.name)
		$('.shopname').html(res.info)
		$('.small').append(`<img src="http:${res.picurl}">`)
		$('.big img').attr('src','http:'+res.picurl)
		$('.wrap > p').html(res.name)
		$('.prc').html(res.price/100)
	},error:function(res)
	{
		console.log(res)
	}
})
var ipt =document.getElementById('ipt');
ipt.value = 1;
function jia()
		{
			ipt.value=parseInt(ipt.value)+1;
		}

		function jian()
		{
			if(ipt.value==1)
			{
				ipt.value =1;
			}else
			{
				ipt.value-=1;
			}
		}
function addProduct()
		{
			if($.cookie('data')==undefined)
				{
					alert('您还尚未登录，无法添加购物车！')
				}else
				{
					let otoken=JSON.parse($.cookie('data')).token
					$.ajax({

						url:'http://47.104.244.134:8080/cartsave.do',
						type:'get',
						data:{gid:oid,token:otoken},
						success:function(res){
							console.log(res)
							alert('添加购物车成功')
						},
						error:function(res){
							
						}
					})
				}
			
		}
