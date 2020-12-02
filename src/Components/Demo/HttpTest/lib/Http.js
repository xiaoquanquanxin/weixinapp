import Http from 'LibUtils/Http'
import waitWindow from 'LibComponents/WaitWindow'
class MyHttp{
    constructor(){
        this.http=new Http();
    }
    alert(msg){
        alert(msg);
    }
    async get({url,cformData=null,headers={},prefix=''}){
        waitWindow.show();
        url = prefix+url;
        try {
            let result = await this.http.get({url, cformData, headers});
            waitWindow.hide()
            if (result.resultMsg=='success'){
                return result
            }else{
                let msg=result.error+'['+result.code+']';
                this.alert(msg);
                return msg;
            }
        }catch (e){
            waitWindow.hide()
            this.alert(e);
            return e;
        }
    }
    async post({url,cformData=null,headers={},prefix=''}){
        waitWindow.show();
        url = prefix+url;
        try{
            let result=await this.http.post({url,cformData,headers})
            waitWindow.hide()
            if (result.resultMsg=='success'){
                return result
            }else{
                let msg=result.error+'['+result.code+']';
                this.alert(msg);
                return msg;
            }
        }catch(e){
            waitWindow.hide()
            this.alert(e);
            return e;
        }
    }
}
export default new MyHttp;