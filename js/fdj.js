class Ddj{
				constructor(sel) {
					
					this.sel = sel;

					this.el = document.querySelector(this.sel)
					this.mask = document.querySelector(this.sel + ' .mask')
					this.big = document.querySelector(this.sel + ' .big')
					this.bigImg = document.querySelector(this.sel + ' .big-img')
					
					let that = this;

					this.reSizeBigImg()
					this.maskAndBigImgMove()



				}

				maskAndBigImgMove(){
					let that = this;
					this.el.onmousemove = function(evt){
						let offsetX = evt.pageX - that.el.offsetLeft;
						let offsetY = evt.pageY - that.el.offsetTop;
						let maskX = offsetX - that.mask.offsetWidth/2
						let maskY = offsetY -that.mask.offsetWidth/2
						if(maskX <=0 ){
							maskX = 0;
						}
						if(maskX >= this.el.offsetWidth-this.mask.offsetWidth){
							maskX = this.el.offsetWidth-this.mask.offsetWidth
						}

						if(maskY <=0 ){
							maskY = 0;
						}
						if(maskY >= this.el.offsetWidth-this.mask.offsetWidth){
							maskY = this.el.offsetWidth-this.mask.offsetWidth
						}



						that.mask.style.left = maskX+'px'
						that.mask.style.top = maskY+'px'


						that.bigImg.style.left = -maskX * this.bigImg.offsetWidth/this.el.offsetWidth +'px'
						that.bigImg.style.top = -maskY* this.bigImg.offsetWidth/this.el.offsetWidth +'px'




					}.bind(this)

				}

				//调整 大图和小图的比例关系
				reSizeBigImg(){
					let that = this;
					//调整   small/mask = bigImg/big
					//  bigimg = big*small/mask  

					let bigImgWidth = parseFloat(getComputedStyle(this.big).width)*parseFloat(getComputedStyle(this.el).width)/parseFloat(getComputedStyle(this.mask).width)
					this.bigImg.style.width = bigImgWidth+'px';
					

				}

			}

			let t = new Ddj('#fdj')
			console.log(t)
			$('.small').hover(function(){
				$('.mask').css({'display':'block'})
				$('.big').css({'display':'block'})
			},function(){
				$('.mask').css({'display':'none'})
				$('.big').css({'display':'none'})
			})