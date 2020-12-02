// 定义对数据的操作
class WebviewMsg {
    sendData(data){
        if (window.originalPostMessage) {
            window.postMessage(data);
            return true;
        } else {
            return false;
        }
    }
    documentReady(){
        document.addEventListener('message', function (e) {

        });
    }
}
export default Actions;
