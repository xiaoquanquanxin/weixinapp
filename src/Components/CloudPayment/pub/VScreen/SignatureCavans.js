/*signature组件*/

/*公用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';

/*antd-mobile*/
import { Tag, Picker, List, Toast,} from 'antd-mobile';


/*当前页面要用的*/
// import './WorkConduct.less';

const pageTitle = '';

@inject('store', 'actions')
@observer

class SignatureCavans extends React.Component {
	static defaultProps = {};

	constructor () {
		super();
		this.state = {
			signaturePad: ''
		};
		this.signaturePad = '';
	}

	componentDidMount () {
		const { storeWorkConduct } = this.props.actions;
		this.renderSignaturePad(this.props.onClick,this.props.actions);

	}

	renderSignaturePad (onClick,propsObj) {
		/*!
		 * Modified
		 * Signature Pad v1.5.3
		 *
		 * Copyright 2018 wangliang
		 * Released under the MIT license
		 */
		let SignaturePad = (function (document) {
			let log = console.log.bind(console);

			let SignaturePad = function (canvas, options) {
				let self = this,
					opts = options || {};
				//定义构造函数的公共属性
				this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;
				this.minWidth = opts.minWidth || 0.5;
				this.clickEvent = opts.clickEvent;	//弹窗点击事件
				this.propsObj = opts.propsObj;		//整个props

				this.maxWidth = opts.maxWidth || 2.5;
				this.dotSize = opts.dotSize || function () {
					return (self.minWidth + self.maxWidth) / 2;
				};
				this.penColor = opts.penColor || 'black';
				this.backgroundColor = opts.backgroundColor || 'rgba(0,0,0,0)';
				this.throttle = opts.throttle || 0;
				this.throttleOptions = {
					leading: true,
					trailing: true
				};
				this.minPointDistance = opts.minPointDistance || 0;
				this.onEnd = opts.onEnd;
				this.onBegin = opts.onBegin;

				this._canvas = canvas;
				this._ctx = canvas.getContext('2d');
				this._ctx.lineCap = 'round';
				this.clear();

				// 添加这些方法，绑定在this对象中，方便以后用
				//  访问“self”我们可以使用绑定，但不值得添加依赖项

				//MOUSE按下去
				this._handleMouseDown = function (event) {
					if (event.which === 1) {
						self._mouseButtonDown = true;
						self._strokeBegin(event);
					}
				};

				//MOUSE Mover
				let _handleMouseMove = function (event) {
					event.preventDefault();
					if (self._mouseButtonDown) {
						self._strokeUpdate(event);
						if (self.arePointsDisplayed) {
							let point = self._createPoint(event);
							self._drawMark(point.x, point.y, 5);
						}
					}
				};

				//this._handleMouseMove = _.throttle(_handleMouseMove, self.throttle, self.throttleOptions);
				this._handleMouseMove = _handleMouseMove;

				//mouse弹起
				this._handleMouseUp = function (event) {
					if (event.which === 1 && self._mouseButtonDown) {
						self._mouseButtonDown = false;
						self._strokeEnd(event);
					}
				};

				//mouse开始拖动
				this._handleTouchStart = function (event) {
					console.log('1_________________',);
					if (event.targetTouches.length == 1) {
						let touch = event.changedTouches[0];
						self._strokeBegin(touch);
					}
				};

				//mouse移动
				let _handleTouchMove = function (event) {
					// Prevent scrolling.
					event.preventDefault();

					let touch = event.targetTouches[0];
					self._strokeUpdate(touch);
					if (self.arePointsDisplayed) {
						let point = self._createPoint(touch);
						self._drawMark(point.x, point.y, 5);
					}
				};

				//this._handleTouchMove = _.throttle(_handleTouchMove, self.throttle, self.throttleOptions);
				this._handleTouchMove = _handleTouchMove;

				//拖动结束
				this._handleTouchEnd = function (event) {
					let wasCanvasTouched = event.target === self._canvas;
					if (wasCanvasTouched) {
						event.preventDefault();
						self._strokeEnd(event);
					}
				};

				this._handleMouseEvents();
				this._handleTouchEvents();
			};

			//清理按理(公共方法)
			SignaturePad.prototype.clear = function () {
				let ctx = this._ctx,
					canvas = this._canvas;

				ctx.fillStyle = this.backgroundColor;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				this._reset();
			};

			/*显示点*/
			SignaturePad.prototype.showPointsToggle = function() {
				this.arePointsDisplayed = !this.arePointsDisplayed;
			};

			//转化为图片
			SignaturePad.prototype.toDataURL = function (imageType, quality) {
				let canvas = this._canvas;
				return canvas.toDataURL.apply(canvas, arguments);
			};

			SignaturePad.prototype.fromDataURL = function (dataUrl) {
				let self = this,
					image = new Image(),
					ratio = window.devicePixelRatio || 1,
					width = this._canvas.width / ratio,
					height = this._canvas.height / ratio;

				this._reset();
				image.src = dataUrl;
				image.onload = function () {
					self._ctx.drawImage(image, 0, 0, width, height);
				};
				this._isEmpty = false;
			};

			SignaturePad.prototype._strokeUpdate = function (event) {
				console.log('3_____________');
				let point = this._createPoint(event);
				if (this._isPointToBeUsed(point)) {
					this._addPoint(point);
				}
			};

			let pointsSkippedFromBeingAdded = 0;
			SignaturePad.prototype._isPointToBeUsed = function (point) {
				// Simplifying, De-noise
				if (!this.minPointDistance)
					return true;
				let points = this.points;
				if (points && points.length) {
					let lastPoint = points[points.length - 1];
					if (point.distanceTo(lastPoint) < this.minPointDistance) {
						// log(++pointsSkippedFromBeingAdded);
						return false;
					}
				}
				return true;
			};

			//mouse开始拖动
			SignaturePad.prototype._strokeBegin = function (event) {
				this._reset();
				this._strokeUpdate(event);
				if (typeof this.onBegin === 'function') {
					this.onBegin(event);
				}
			};

			//开始画
			SignaturePad.prototype._strokeDraw = function (point) {
				let ctx = this._ctx,
					dotSize = typeof(this.dotSize) === 'function' ? this.dotSize() : this.dotSize;
				ctx.beginPath();
				this._drawPoint(point.x, point.y, dotSize);
				ctx.closePath();
				ctx.fill();
			};

			SignaturePad.prototype._strokeEnd = function (event) {
				let canDrawCurve = this.points.length > 2,
					point = this.points[0];

				if (!canDrawCurve && point) {
					this._strokeDraw(point);
				}
				if (typeof this.onEnd === 'function') {
					this.onEnd(event);
				}
			};

			SignaturePad.prototype._handleMouseEvents = function () {
				this._mouseButtonDown = false;

				this._canvas.addEventListener('mousedown', this._handleMouseDown);
				this._canvas.addEventListener('mousemove', this._handleMouseMove);
				document.addEventListener('mouseup', this._handleMouseUp);
			};

			SignaturePad.prototype._handleTouchEvents = function () {
				// Pass touch events to canvas element on mobile IE11 and Edge.
				this._canvas.style.msTouchAction = 'none';
				this._canvas.style.touchAction = 'none';

				this._canvas.addEventListener('touchstart', this._handleTouchStart);	//监听事件
				this._canvas.addEventListener('touchmove', this._handleTouchMove);
				this._canvas.addEventListener('touchend', this._handleTouchEnd);
			};

			SignaturePad.prototype.on = function () {
				this._handleMouseEvents();
				this._handleTouchEvents();
			};

			SignaturePad.prototype.off = function () {
				this._canvas.removeEventListener('mousedown', this._handleMouseDown);
				this._canvas.removeEventListener('mousemove', this._handleMouseMove);
				document.removeEventListener('mouseup', this._handleMouseUp);

				this._canvas.removeEventListener('touchstart', this._handleTouchStart);
				this._canvas.removeEventListener('touchmove', this._handleTouchMove);
				this._canvas.removeEventListener('touchend', this._handleTouchEnd);
			};

			SignaturePad.prototype.isEmpty = function () {
				return this._isEmpty;
			};

			//清理工作
			SignaturePad.prototype._reset = function () {
				this.points = [];
				this._lastVelocity = 0;
				this._lastWidth = (this.minWidth + this.maxWidth) / 2;
				this._isEmpty = true;
				this._ctx.fillStyle = this.penColor;
			};

			SignaturePad.prototype._createPoint = function (event) {
				let rect = this._canvas.getBoundingClientRect();
				return new Point(
					event.clientX - rect.left,
					event.clientY - rect.top
				);
			};

			SignaturePad.prototype._addPoint = function (point) {
				let points = this.points,
					c2, c3,
					curve, tmp;

				points.push(point);

				if (points.length > 2) {
					// To reduce the initial lag make it work with 3 points
					// by copying the first point to the beginning.
					if (points.length === 3) points.unshift(points[0]);

					tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);
					c2 = tmp.c2;
					tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
					c3 = tmp.c1;
					curve = new Bezier(points[1], c2, c3, points[2]);
					this._addCurve(curve);

					// Remove the first element from the list,
					// so that we always have no more than 4 points in points array.
					points.shift();
				}
			};

			SignaturePad.prototype._calculateCurveControlPoints = function (s1, s2, s3) {
				let dx1 = s1.x - s2.x,
					dy1 = s1.y - s2.y,
					dx2 = s2.x - s3.x,
					dy2 = s2.y - s3.y,

					m1 = {
						x: (s1.x + s2.x) / 2.0,
						y: (s1.y + s2.y) / 2.0
					},
					m2 = {
						x: (s2.x + s3.x) / 2.0,
						y: (s2.y + s3.y) / 2.0
					},

					l1 = Math.sqrt(1.0 * dx1 * dx1 + dy1 * dy1),
					l2 = Math.sqrt(1.0 * dx2 * dx2 + dy2 * dy2),

					dxm = (m1.x - m2.x),
					dym = (m1.y - m2.y),

					k = l2 / (l1 + l2),
					cm = {
						x: m2.x + dxm * k,
						y: m2.y + dym * k
					},

					tx = s2.x - cm.x,
					ty = s2.y - cm.y;

				return {
					c1: new Point(m1.x + tx, m1.y + ty),
					c2: new Point(m2.x + tx, m2.y + ty)
				};
			};

			SignaturePad.prototype._addCurve = function (curve) {
				let startPoint = curve.startPoint,
					endPoint = curve.endPoint,
					velocity, newWidth;

				velocity = endPoint.velocityFrom(startPoint);
				velocity = this.velocityFilterWeight * velocity +
					(1 - this.velocityFilterWeight) * this._lastVelocity;

				newWidth = this._strokeWidth(velocity);
				this._drawCurve(curve, this._lastWidth, newWidth);

				this._lastVelocity = velocity;
				this._lastWidth = newWidth;
			};

			SignaturePad.prototype._drawPoint = function (x, y, size) {
				let ctx = this._ctx;

				ctx.moveTo(x, y);
				ctx.arc(x, y, size, 0, 2 * Math.PI, false);
				this._isEmpty = false;
			};

			SignaturePad.prototype._drawMark = function (x, y, size) {
				let ctx = this._ctx;

				ctx.save();
				ctx.moveTo(x, y);
				ctx.arc(x, y, size, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
				ctx.fill();
				ctx.restore();
			};

			SignaturePad.prototype._drawCurve = function (curve, startWidth, endWidth) {
				let ctx = this._ctx,
					widthDelta = endWidth - startWidth,
					drawSteps, width, i, t, tt, ttt, u, uu, uuu, x, y;

				drawSteps = Math.floor(curve.length());
				ctx.beginPath();
				for (i = 0; i < drawSteps; i++) {
					// Calculate the Bezier (x, y) coordinate for this step.
					t = i / drawSteps;
					tt = t * t;
					ttt = tt * t;
					u = 1 - t;
					uu = u * u;
					uuu = uu * u;

					x = uuu * curve.startPoint.x;
					x += 3 * uu * t * curve.control1.x;
					x += 3 * u * tt * curve.control2.x;
					x += ttt * curve.endPoint.x;

					y = uuu * curve.startPoint.y;
					y += 3 * uu * t * curve.control1.y;
					y += 3 * u * tt * curve.control2.y;
					y += ttt * curve.endPoint.y;

					width = startWidth + ttt * widthDelta;
					this._drawPoint(x, y, width);
				}
				ctx.closePath();
				ctx.fill();
			};

			SignaturePad.prototype._strokeWidth = function (velocity) {
				return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
			};

			let Point = function (x, y, time) {
				this.x = x;
				this.y = y;
				this.time = time || new Date().getTime();
			};

			Point.prototype.velocityFrom = function (start) {
				return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 1;
			};

			Point.prototype.distanceTo = function (start) {
				return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
			};

			let Bezier = function (startPoint, control1, control2, endPoint) {
				this.startPoint = startPoint;
				this.control1 = control1;
				this.control2 = control2;
				this.endPoint = endPoint;
			};

			// Returns approximated length.
			Bezier.prototype.length = function () {
				let steps = 10,
					length = 0,
					i, t, cx, cy, px, py, xdiff, ydiff;

				for (i = 0; i <= steps; i++) {
					t = i / steps;
					cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
					cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
					if (i > 0) {
						xdiff = cx - px;
						ydiff = cy - py;
						length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
					}
					px = cx;
					py = cy;
				}
				return length;
			};

			Bezier.prototype._point = function (t, start, c1, c2, end) {
				return start * (1.0 - t) * (1.0 - t) * (1.0 - t) +
					3.0 * c1 * (1.0 - t) * (1.0 - t) * t +
					3.0 * c2 * (1.0 - t) * t * t +
					end * t * t * t;
			};


			SignaturePad.prototype._closeModal = function () {
				if (typeof this.clickEvent === 'function') {
					this.clickEvent('modal2');
					return true
				}
				return false;
			};



			SignaturePad.prototype._requestActions = function (data,signaturePad) {
				console.log('signaturePad_____________:', signaturePad)
				this.propsObj.actionsWorkConduct.fileUpload(data,signaturePad);
			/*	console.log('propsObj____________', this.propsObj)
				this.propsObj.srcbox=data;*/
				// console.log('this_________________________', this.propsObj.actionsWorkConduct.fileUpload())
				/*		if (typeof this.clickEvent === 'function') {
							this.clickEvent('modal2');
						}*/
			};


			return SignaturePad;
		})(document);


		//实例化入口
		let signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
			backgroundColor: 'rgba(255, 255, 255, 0)',
			penColor: 'rgb(0, 0, 0)',
			velocityFilterWeight: .7,
			minWidth: 0.5,
			maxWidth: 2.5,
			throttle: 16, // max x milli seconds on event update, OBS! this introduces lag for event update
			minPointDistance: 3,
			clickEvent:onClick,
			propsObj
		});


		//showPointsToggle = document.getElementById('showPointsToggle');
		/*
		//边描红色点
			showPointsToggle.addEventListener('click', function(event) {
				signaturePad.showPointsToggle();
				showPointsToggle.classList.toggle('toggle');
			});*/
		//保存,清理按纽
		let saveButton = document.getElementById('save');
		let clearButton = document.getElementById('clear');


		//点清理按纽
		clearButton.addEventListener('click', function (event) {
			signaturePad.clear();
		});


		//点保存,生成图片
		saveButton.addEventListener('click', function (event) {

			let data = signaturePad.toDataURL('image/png');
			//document.getElementById('imgsrc').src = data;
			const tes=signaturePad.fromDataURL(data);
			signaturePad._requestActions(data,signaturePad);
			// window.jQuery('.signaturePad-img-box').height('auto');
			//const processStatus= signaturePad._closeModal();

		/*	if (processStatus) {
				signaturePad._requestActions(data,signaturePad);
			}*/
			//window.open(data);
		});


	}




	render () {
		console.log('window.screen.availWidth____:', window.screen.height-20)
		console.log('window.screen.height____:', window.screen.availWidth)
		//注入store
		return <div className="signature-box" >

			<canvas id="signature-pad"
					width={window.screen.height-20}
					height={window.screen.availWidth * 2 / 3+20}
			/>
			<div className="btn-loaction" >
				<div className={'fix'} >
					<a
						id="save"
					>保存</a >

					<a id="clear" >清除</a >
				</div >
			</div >
		</div >;

	}

	componentWillUnmount () {
		this.props.store.storeWorkConduct.signaturePadImags = '';
	}

}

export default SignatureCavans;
