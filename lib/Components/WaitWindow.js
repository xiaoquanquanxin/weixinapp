import {Toast} from 'antd-mobile';
class WaitWindow{
    constructor(){
        this.index=0;
    }
    show(content, onClose=null, mask=true){
        if (this.index==0){
            Toast.loading(content, 100000,onClose,mask);
        }
        this.index++;
    }
    hide(){
        this.index--;
        if (this.index<=0){
            this.hideAll();
        }
    }
    hideAll(){
        this.index=0;
        Toast.hide();
    }

}
var waitWindow=new WaitWindow();
export default waitWindow