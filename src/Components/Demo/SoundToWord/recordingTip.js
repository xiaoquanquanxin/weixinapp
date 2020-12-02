import './recordingTip.less';
function show(tip="点击停止录音") {
    var $=window.JQ;
    var $tip=$(`<div class="forjs_WaitingTip"><div class="recording-tip">
<div class="loadingTip">
        <div class="loader-inner line-scale-pulse-out-rapid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
       </div>
</div>
<div class="recording-tip" style="background-color: rgba(0, 0, 0, 0);"><div class="txt-tip">${tip}</div> </div>
</div>`)
    $("body").append($tip)
    return $tip
}
export default show