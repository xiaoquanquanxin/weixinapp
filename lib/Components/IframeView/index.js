function show(id,src) {
    var $=window.JQ;
    let data=`
    <div id="${id}" style="width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000000;
    background-color: #000;
    "><iframe frameborder="no" border="0" style="width: 100%;height: 100%;border-color: rgba(0,0,0,0);" scrolling="auto" src="${src}"></iframe>
    <div data-id="${id}" class="forjs_closeiframe" style="position: fixed;
    top: 0;
    right: 0;
    width: .3rem;
    height: .3rem;
    background-color: rgba(6,6,6,0.2);">
    <svg t="1566388372948" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2019" width="100%" height="100%"><path d="M546.942134 511.818772l327.456957-326.128977c9.617355-9.577423 9.648071-25.135361 0.070648-34.751692-9.577423-9.617355-25.137409-9.647048-34.750668-0.070648L512.119795 477.137729 184.520518 150.868479c-9.616331-9.577423-25.176316-9.545683-34.751692 0.070648-9.577423 9.616331-9.545683 25.174268 0.070648 34.751692l327.457981 326.127953-327.457981 326.128978c-9.616331 9.577423-9.647048 25.135361-0.070648 34.751692a24.496456 24.496456 0 0 0 17.41117 7.231702 24.500552 24.500552 0 0 0 17.340522-7.162078L512.119795 546.499816l327.599276 326.26925a24.492361 24.492361 0 0 0 17.340522 7.162078 24.5026 24.5026 0 0 0 17.41117-7.231702c9.577423-9.617355 9.545683-25.175292-0.070648-34.751692L546.942134 511.818772z" fill="#ffffff" p-id="2020"></path></svg>
    </div>
    `
    let $target=$(data)
    $target.find(".forjs_closeiframe").click(function (e) {
        e.preventDefault()
        // alert("关闭")
        $("#"+$(this).data('id')).remove();
    })
    $("body").append($target)
    return $target
}
export default show