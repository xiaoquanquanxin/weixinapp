function show(tip) {
    var $=window.JQ;
    var $tip=$(`<div class="forjs_WaitingTip"><div class="loading-tip">
<div class="loadingTip">
        <div class="loader-inner line-spin-fade-loader">
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
<div class="loading-tip" style="background-color: rgba(0, 0, 0, 0);"><div class="txt-tip">${tip}</div> </div>
</div>`)
    $("body").append($tip)
    return $tip
}
function hide($waitingTip=null) {
    if (!$waitingTip){
        //关闭所有
        $('.forjs_WaitingTip').remove();
    }else{
        $waitingTip.remove();
    }
}
export default {show,hide}