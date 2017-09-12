<template>
	<div 
		v-show="canvasSwitch" 
	  	:style="style"
	  >
		<canvas
	  		v-bind:id="canvasId"
	  		:ref="canvasId"
	  		v-on:mousemove="move($event)"
	  		v-on:click="click($event)"
	  	></canvas>
	  	<img src="static/images/Hero.png" alt="" style="position: fixed; bottom: 0; " width="160" height="200" v-show="drop">
	</div>
</template>

<script>
export default {
	name: 'canvas-red-packets-rain',
	props: ['canvasSwitch'],
	data () {
		return {
			style: {
				position: 'fixed',
				zIndex: 1031,
				top: 0,
				left: 0
			},
			proGress: {
				width: 200,
				height: 10,
				marginTop: 60,
				marginRight: 20,
				lineCap: 'round',
				unfinishedColor: 'rgba(255, 255, 255, 0.7)',
				finishedColor: 'yellow'
			},
			count: 10,
			canvasId: 'red_packets_rain',
			cxt: null,
			timer: null,
			redPackets: [],
			drop: true,
			target: 5,
			finished: 0,
			images: [],
			member: [],
			permutation: {
				total: {
					x: 0,
					y: 0
				},
				origin: {
					x: 10,
					y: 125
				},
				translate: {
					x: 0,
					y: 0
				},
				distance: {
					x: 120,
					y: 80
				},
				fontSpace: 30
			}
		}
	},
	mounted () {
		// this.start()
		this.init()
	},
	watch: {
		canvasSwitch: function(newV, oldV) {
			if (newV) {
				this.keep()
			}
		}
	},
	methods: {
		init () {console.log(navigator)
			let canvas = this.$refs[this.canvasId]
			this.cxt = canvas.getContext('2d')

			if (!this.cxt) {
				console.warn('failed canvas getContext')
				return
			}



			for (let i = 1; i <= 10; i ++) {
				let img = new Image()
				img.src = 'static/images/spark' + i + '.png'
				this.images.push(img)
			}


			fetch('static/data/member.json')
			.then(res => res.json())
			.then(res => this.member = res.data)



			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			canvas.style.background = 'rgba(0, 0, 0, 0.9)'

		},
		getSpeed () {
			return {
				speedX: Math.floor(Math.random() * 3) + 0.5,
				speedY: Math.floor(Math.random() * 10) + 5
			}
		},
		extract () {
			if (this.drop === true || this.redPackets.length !== 0) {
				return false
			}
			const { cxt, target, member, permutation: { origin, translate, distance, fontSpace } } = this

			this.clear()
			cxt.save()




			cxt.textAlign = 'left'
			cxt.shadowColor = "#990066"
			cxt.shadowBlur = 20


			let total = {
				x: 0,
				y: 0
			}
			// cxt.rotate(90 * (Math.PI / 180))
			for (let i = 0; i < member.length; i ++) {
				cxt.font = '16px 微软雅黑'
				translate.x = i % target === 0 ? distance.x : 0
				translate.y = i % target === 0 ? - total.y : distance.y
				total.x += translate.x
				total.y += translate.y
				cxt.scale(0.98, 1.02)
				cxt.translate(translate.x, translate.y)



				cxt.fillText(member[i].name, origin.x, origin.y)
				cxt.fillText(String(member[i].phone).replace(String(member[i].phone).substr(3, 4), '****'), origin.x, origin.y + fontSpace)
			}
			cxt.restore()
		},
		addRedPackets (count = 20) {
			if (this.redPackets.length > count) {
				return false
			}
			if (this.drop === false) {
				return false
			}
			let width = Math.floor(Math.random() * 80) + 20
			let height = width * (Math.random()*0.2 + 1.1)
			let x = Math.floor(Math.random() * (this.cxt.canvas.width + 200))
			let y = - height
			this.redPackets.push({
				width,
				height,
				x,
				y,
				...this.getSpeed(),
				speedZ: 10,
				deg: Math.floor(Math.random() * 180),
				transform: [
					Math.floor(Math.random() * 270) + 90,
					Math.floor(Math.random() * 270) + 90,
					Math.floor(Math.random() * 270) + 90,
					Math.floor(Math.random() * 270) + 90,
					0,
					1
				],
				stop: false,
				bomb: [],
				bombAlpha: 1,
				hasBomb: false,
				color: '#b33',
				shadowColor: [
					this.randomColor(),
					this.randomColor(),
					this.randomColor()
				]
			})
			// console.log(this.redPackets.length)
		},
		clear (x, y, ex, ey) {
			const { cxt } = this
			cxt.clearRect(x || 0, y || 0, ex || cxt.canvas.width, ey || cxt.canvas.height)
		},
		randomColor () {
			return '#' + Math.floor( Math.random() * Math.pow( 16 , 6 ) ).toString(16)
		},
		rightTopProgressUnfinished () {
			const { cxt, proGress } = this
			cxt.beginPath()
			cxt.lineCap = proGress.lineCap
			cxt.lineWidth = proGress.height
			cxt.moveTo(cxt.canvas.width - proGress.marginRight - proGress.width, proGress.marginTop)
			cxt.lineTo(cxt.canvas.width - proGress.marginRight, proGress.marginTop)
			cxt.strokeStyle = proGress.unfinishedColor
			cxt.stroke()
			cxt.closePath()
		},
		rightTopProgressFinished () {
			const { cxt, proGress, target, finished } = this
			
			{
				cxt.beginPath()
				cxt.lineCap = proGress.lineCap
				cxt.lineWidth = proGress.height
				cxt.moveTo(cxt.canvas.width - proGress.marginRight - proGress.width, proGress.marginTop)
				cxt.lineTo(cxt.canvas.width - proGress.marginRight - (proGress.width / target) * (target - finished), proGress.marginTop)
				cxt.strokeStyle = proGress.finishedColor
				cxt.stroke()
				cxt.closePath()
			}
			{
				cxt.beginPath()
				cxt.font = "20px 微软雅黑"
				cxt.textAlign = 'center'
				cxt.fillStyle = '#fff'
				cxt.fillText(finished + '    of    ' + target, cxt.canvas.width - proGress.marginRight - (proGress.width / 2), proGress.marginTop + 35)
				cxt.closePath()
			}
		},
		click (e) {
			const { redPackets: redP } = this
			this.finished = 5
			for (let i = 0; i < redP.length; i ++) {
				if (redP[i].stop === true) {
					this.finished += 1
					if (this.finished >= this.target) {
						this.finished = this.target
						this.drop = false
					}
					redP[i].hasBomb = true
					redP[i].width = 0
					redP[i].height = 0
					let color = this.randomColor()
					let img = [
						this.images[Math.floor(Math.random() * 10)],
						this.images[Math.floor(Math.random() * 10)]
					]
					for (let o = 0; o < Math.floor(Math.random() * 70 + 45); o ++) {
						redP[i].bomb.push({
							originX: redP[i].x,
							originY: redP[i].y,
							x: redP[i].x,
							y: redP[i].y,
							width: Math.random() * 20 + 15,
							range: Math.random() * 2,
							speedX: Math.random() * 30 - 15,
							speedY: Math.random() * 30 - 15,
							distanceX: 0,
							distanceY: 0,
							color: [color, '#fff', this.randomColor()],
							radian: 20,
							image: {
								img,
								size: Math.floor(Math.random() * 60 + 50)
							}
						})
					}
					break
				}
			}
		},
		move (e) {
			const { redPackets: redP } = this
			for (let i = 0; i < redP.length; i ++) {
				if (e.clientX >= redP[i].x && e.clientX <= redP[i].x + redP[i].width && e.clientY >= redP[i].y && e.clientY <= redP[i].y + redP[i].height) {
					redP[i].stop = true
					redP[i].color = '#fbcdaf'
					break
				} else {
					redP[i].stop = false
					redP[i].color = "#b33"
				}
			}
		},
		draw () {


			if (this.drop === false && this.redPackets.length === 0) {
				return false
			}



			const setState = (state) => {
				// state.transform[0] += state.speedX
				// state.transform[4] += state.speedY
				state.transform[0] += 8
				state.transform[1] += 9//state.speedZ
				state.transform[2] += 10
				return {
					...state,
					x: state.stop ? state.x : state.x - state.speedX,
					y: state.stop ? state.y : state.y + state.speedY,
					deg: state.deg - 0,
					transform: state.transform
				}
			}
			/**
			 * 图形变换矩阵( 默认情况下是一个单位举证 )
			 * 一个三维正矩阵  transform 的效果会累计, 直到遇到 setTransform
			 *  a, c, e  |  1, 0, 0 
			 *  b, d, f  |  0, 1, 0
			 *  0, 0, 1  |  0, 0, 1
			 * transform(水平缩放a, 水平倾斜b, 垂直倾斜c, 垂直缩放d, 水平位移e, 垂直位移f)
			 */


			const { cxt, redPackets: redP } = this
			this.clear()
			for (let i = 0 ; i < redP.length; i ++) {

				if (redP[i].y > cxt.canvas.height + 100) {
					this.redPackets.splice([i], 1)
					continue
				}
				if (redP[i].hasBomb) {

					let bomb = redP[i].bomb
					cxt.save()

					// let bombAlpha = 1
					// let timer = setInterval(() => {
					// 	bombAlpha -= 0.1
					// 	cxt.globalAlpha = bombAlpha
					// 	if (bombAlpha <= 0) {
					// 		bombAlpha = 0
					// 		clearInterval(timer)
					// 	}
					// }, 100)
					if (redP[i].bombAlpha > 0) {
						redP[i].bombAlpha -= 0.015
					}
					if (redP[i].bombAlpha <= 0) {
						redP[i].bombAlpha = 0
						this.redPackets.splice(i, 1)
						continue
					}
					cxt.globalAlpha = redP[i].bombAlpha

					
					
					cxt.shadowBlur = 10
					for (let b = 0; b < bomb.length; b ++)
					{
						// bomb[b].speedY += 0.3
						let size = 10
						let rate = 0.3
						if (bomb[b].distanceX >= size) {
							if (bomb[b].speedX > 1) {
								bomb[b].speedX -= rate
							}
						} else if (bomb[b].distanceX <= -size) {
							if (bomb[b].speedX < -1) {
								bomb[b].speedX += rate
							}
						}
						if (bomb[b].distanceY >= size) {
							if (bomb[b].speedY > 1) {
								bomb[b].speedY -= rate
							}
						} else if (bomb[b].distanceY <= -size) {
							bomb[b].speedY += rate 
						}
						// if (bomb[b].speedY < 0) {
						// 	bomb[b].speedY -= 1
						// } else {
						// 	bomb[b].speedY = 1
						// }
						// setInterval(() => {
						// 	bomb[b].speedY += 0.3
						// }, 50)
						//bomb[b].speedY += 0.3
						
						// if (bomb[b].distanceX >= 100) {
						// 	bomb[b].speedX = 0.3
						// }
						// if (bomb[b].distanceY >= 100) {
						// 	bomb[b].speedY = 0.1
						// }
							

						bomb[b].x += bomb[b].speedX
						bomb[b].y += bomb[b].speedY
						bomb[b].distanceX += bomb[b].speedX
						bomb[b].distanceY += bomb[b].speedY
						let x = bomb[b].x
						let y = bomb[b].y
						let width = bomb[b].width
						let range = bomb[b].range
						let radian = bomb[b].radian
						let color = bomb[b].color[b % 2]
						cxt.beginPath()
						//cxt.miterLimit = 20
						{
							cxt.drawImage(bomb[b].image.img[b % 2], x + (width / 2), y + (width / 2) , bomb[b].image.size, bomb[b].image.size)
						}
						cxt.closePath()
						//拖尾
						// cxt.beginPath()
						// {
						// 	radian += 10
						// 	cxt.moveTo(bomb[b].originX + (width / 2), bomb[b].originY + (width / 2))
						// 	cxt.quadraticCurveTo(
						// 		(x - bomb[b].originX) / 2 + bomb[b].originX,
						// 		(y - bomb[b].originY) / 2 + bomb[b].originY - radian,
						// 		x,
						// 		y

						// 	)
						// 	cxt.lineWidth = 1
						// 	cxt.strokeStyle = color
						// 	cxt.stroke()
						// }
						// cxt.closePath()

						// cxt.beginPath()
						// {
						// 	cxt.moveTo(x + (width / 2) - range, y + (width / 2))
						// 	cxt.lineTo(x + (width / 2), y)
						// 	cxt.lineTo(x + (width / 2) + range, y + (width / 2))
						// }
						// {
						// 	cxt.moveTo(x + (width / 2), y + (width / 2) - range)
						// 	cxt.lineTo(x + width, y + (width / 2))
						// 	cxt.lineTo(x + (width / 2), y + (width / 2) + range)
						// }
						// {
						// 	cxt.moveTo(x + (width / 2) - range, y + (width / 2))
						// 	cxt.lineTo(x + (width / 2), y + width)
						// 	cxt.lineTo(x + (width / 2) + range, y + (width / 2))
						// }
						// {
						// 	cxt.moveTo(x + (width / 2), y + (width / 2) - range)
						// 	cxt.lineTo(x, y + (width / 2))
						// 	cxt.lineTo(x + (width / 2), y + (width / 2) + range)
						// }
						// // cxt.globalAlpha = 0.7
						// cxt.fillStyle = bomb[b].color[b % 2]
						// cxt.fill()
						// cxt.closePath()



						// cxt.beginPath()
						// let diagonal = width / 5
						// {
						// 	cxt.moveTo((x + width / 2) - diagonal, (y + width / 2) - diagonal)
						// 	cxt.lineTo((x + width / 2) + diagonal, (y + width / 2) + diagonal)

						// 	cxt.moveTo((x + width / 2) + diagonal, (y + width / 2) - diagonal)
						// 	cxt.lineTo((x + width / 2) - diagonal, (y + width / 2) + diagonal)
						// }
						// cxt.lineWidth = 0.5
						// cxt.strokeStyle = bomb[b].color[b % 2]
						// cxt.stroke()
						// cxt.closePath()


						cxt.beginPath()
						{
							cxt.arc(
								x + (width / 2),
								y + (width / 2),
								2,
								0,
								Math.PI * 2
							)
							cxt.fillStyle = color
							// cxt.shadowColor = color
							cxt.fill()
						}
						cxt.closePath()
						
					}
					
					cxt.restore()


					continue
				}




				cxt.save()
				cxt.beginPath()
				// cxt.fillRect(redP[i].x + redP[i].width / 2, redP[i].y + redP[i].height / 2, 100, 100)

				// redP[i].scaleY = 
				redP[i] = setState(redP[i])
				cxt.translate(redP[i].x + redP[i].width / 2, redP[i].y + redP[i].height / 2)
				// // cxt.fillRect(redP[i].x + redP[i].width / 2, redP[i].y + redP[i].height / 2, 20, 20)
				// // cxt.scale(1, [0.99, 1.01][Math.floor(Math.random() * 2)])
				// cxt.rotate(40 * (Math.PI / 180))
				// cxt.translate(-(redP[i].x + redP[i].width / 2), -(redP[i].y + redP[i].height / 2))
				
				let deg = Math.PI/180;
				//cxt.transform(...redP[i].transform)
				redP[i].stop ? void 0
				: cxt.transform(
					Math.cos(redP[i].transform[0] * deg),
					Math.sin(redP[i].transform[1] * deg),
					-Math.sin(redP[i].transform[2] * deg),
					Math.cos(redP[i].transform[3] * deg),
					redP[i].transform[4],
					redP[i].transform[5]
				)
				// cxt.translate(-1, -1)
				// this.clear()
				// cxt.transform(1, 0, 0, 1, 0, 1);
				cxt.translate(-(redP[i].x + redP[i].width / 2), -(redP[i].y + redP[i].height / 2))
				cxt.textAlign = 'center'
				{
					cxt.shadowBlur = 25
					cxt.shadowColor = redP[i].shadowColor[0]
					cxt.fillStyle = redP[i].color
					cxt.fillRect(redP[i].x, redP[i].y, redP[i].width, redP[i].height)
				}
				{
					cxt.shadowBlur = 6
					cxt.shadowColor = redP[i].shadowColor[1]
					cxt.font = (redP[i].width / 2) + 'px 微软雅黑'
					cxt.fillStyle = "#fff"
					cxt.fillText('￥', redP[i].x + (redP[i].width / 2), redP[i].y + redP[i].height / 2 + redP[i].height / 4)
				}
				{
					cxt.shadowBlur = 8
					cxt.shadowColor = redP[i].shadowColor[2]
					cxt.lineWidth = 1
					cxt.moveTo(redP[i].x, redP[i].y + 3)
					cxt.lineTo(redP[i].x + redP[i].width / 2, redP[i].y + redP[i].height / 3)
					cxt.lineTo(redP[i].x + redP[i].width, redP[i].y + 3)
					cxt.strokeStyle = "#fff"
					// cxt.lineWidth = redP[i].width / 20
					cxt.stroke()
				}
				cxt.closePath()
				cxt.restore()
					// cxt.drawImage(img, 0,0);
			}
		},
		keep () {
			this.draw()
			this.rightTopProgressUnfinished()
			this.rightTopProgressFinished()
			this.addRedPackets()
			this.extract()
			// console.log(this.redPackets.length)

			requestAnimationFrame(this.keep)
		}
	}

}

</script>

<style>

</style>
