signature_pad 方法

var canvas = document.querySelector("canvas");
//在初始化的时候会清空画布上的所有绘制的信息
var signaturePad = new SignaturePad(canvas);

//默认保存为PNG格式的图片,参数为导出的格式,返回值为导出的数据
signaturePad.toDataURL(); // save image as PNG
signaturePad.toDataURL("image/jpeg"); // save image as JPEG
signaturePad.toDataURL("image/svg+xml"); // save image as SVG

// 将数据加载到画布上.参数为数据本身, 无返回值
signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

// 清空画布内容,无返回值
signaturePad.clear();

// 判断画布是否为空.返回Boolean 值
signaturePad.isEmpty();

// 移除画布上的所有事件,就是无法绘制了
signaturePad.off();

// 添加事件,默认为所有,和 off()相反
signaturePad.on();

属性配置项

dotSize   default = (minWidth + maxWidth/2)
//number或函数(取返回值),作用为点击画布的时候,绘制一个半径为dotSize的圆
//注意事项,从input 获取的值为string,而dotSize 为数值,如果通过input设置画笔大小,需要转number,不然就成了字符串拼接,就会出现超级大的点.
minWidth default  0.5
number画笔的笔锋
maxWidth default  2.5
number画笔的粗细
throttle default 16
number每秒绘制的次数,越大越耗性能,越细腻
backgroundColor default null
画布背景色,可以为 green 字符串,#FFFFFF  rgb(0,0,0)格式
penColor default #000000
画笔颜色,可以为 green 字符串,#FFFFFF  rgb(0,0,0)格式
velocityFilterWeight default 0.7
number 用于根据先前的速度修改新速度的重量
onBegin 
回调函数,落笔时候的回调
onEnd
回调函数,收笔时候的回调

使用方法

var signaturePad = new SignaturePad(canvas, {
    minWidth: 5,
    maxWidth: 10,
    penColor: "rgb(66, 133, 244)"
});
//或者在初始化之后
var signaturePad = new SignaturePad(canvas);
signaturePad.minWidth = 5;
signaturePad.maxWidth = 10;
signaturePad.penColor = "rgb(66, 133, 244)";