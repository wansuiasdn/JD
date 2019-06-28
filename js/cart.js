if($.cookie('data')==undefined)
	{
		alert('您还尚未登录，无法查看购物车！')
		window.location.href='login.html'
	}else
	{
		var otoken=JSON.parse($.cookie('data')).token
		$.ajax({
			url:'http://47.104.244.134:8080/cartlist.do',
			type:'get',
			data:{token:otoken},
			success:function(res){
				console.log(res)
				$('.num').html(res.length)
				for(i=0;i<res.length;i++)
				{
					let oprice = res[i].goods.price
					$('.list').append(`

				<div>
					<div>
						<div style="position: relative;float: left;margin-right: 5px;line-height: 30px;font-weight: 700">
							<input type="checkbox" name="" style="vertical-align: middle;margin-right: 3px">
						</div>
						<span>
							<span>${res[i].goods.info}<i></i></span>
						</span>
					</div>
					<div>
						<div>
							<div>
								<div class="c-checkbox">
									<div>
										<input type="checkbox" name="" style="vertical-align: middle;margin-right: 3px">
									</div>
								</div>
								<div class="c-goods">
									<div>
										<div>
											<img src="http:${res[i].goods.picurl}">
										</div>
										<div class="msg" style="float:left">
											<div>${res[i].goods.name}</div>
										</div>
									</div>
									
								</div>
								<div style="width: 130px;padding-right: 0;line-height: 20px;padding: 15px 0 0 20px;min-height: 10px;float: left;"></div>
								<div class="c-price">
									<span>￥${res[i].goods.price/100}</span>
								</div>
								<div class="c-qua">
									<div>
										<a onclick="jian(${i},${oprice},${res[i].id},${res[i].gid})">-</a>
										<input type="text" name="" value="${res[i].count}" id="ipt${i}" class="inin" price="${res[i].goods.price/100}" iid="${res[i].id}" ggid="${res[i].gid}">
										<a onclick="jia(${i},${oprice},${res[i].id},${res[i].gid})">+</a>
									</div>
								</div>
								<div class="sum">
									<span id="span${i}">￥${res[i].count*res[i].goods.price/100}</span>
								</div>
								<div class="cz">
									<p onclick="del(${i},${oprice},${res[i].id},${res[i].gid})">删除</p>
									<p>移到我的关注</p>
								</div>
							</div>
						</div>
					</div>
				</div>

						`)
				}
				let ovalue = '';
				$('.inin').on('focus',function(){
						ovalue = $(this).val()
						console.log(ovalue)
					})	
				$('.inin').on('change',function()
				{

					let price = $(this).attr('price')
					let i =$(this).attr('id').slice(3)
					let iid = $(this).attr('iid')
					let ggid = $(this).attr('ggid')
					if(this.value<1)
					{
						this.value=1;
						$('#span'+i).html('￥'+1*price)
					}else
					{

						$('#span'+i).html('￥'+this.value*price)
						$.ajax({
							url:'http://47.104.244.134:8080/cartupdate.do',
							type:'get',
							data:{id:iid,gid:ggid,num:this.value-ovalue,token:otoken},
							success:function(){

							}
						})

					}
				
			})

			},
			error:function(res){
				
			}
		})
	}
$('.logo').on('click',function(){
	window.location.href='main.html'
})

function jia(i,price,iid,ggid)
		{
			let ipt =document.getElementById('ipt'+i);
			ipt.value=parseInt(ipt.value)+1;
			console.log(ipt.value)
			console.log(price)
			$('#span'+i).html('￥'+(ipt.value*price/100))
			console.log(otoken)
			// 修改购物车接口
			$.ajax({
				url:'http://47.104.244.134:8080/cartupdate.do',
				type:'get',
				data:{id:iid,gid:ggid,num:1,token:otoken},
				success:function(){

				}
			})
		}

		function jian(i,price,iid,ggid)
		{
			let ipt =document.getElementById('ipt'+i);
			if(ipt.value==1)
			{
				ipt.value =1;
				$('#span'+i).html('￥'+1*price/100)
			}else
			{
				ipt.value-=1;
				$('#span'+i).html('￥'+ipt.value*price/100)
				// 修改购物车接口
				$.ajax({
				url:'http://47.104.244.134:8080/cartupdate.do',
				type:'get',
				data:{id:iid,gid:ggid,num:-1,token:otoken},
			})
			}
		}
		function del(i,price,iid,ggid)
		{
			let ipt =document.getElementById('ipt'+i);
			$.ajax({
				url:'http://47.104.244.134:8080/cartupdate.do',
				type:'get',
				data:{id:iid,gid:ggid,num:0,token:otoken},
				success:function(){
					location.reload();
				}
			})
		}

    
