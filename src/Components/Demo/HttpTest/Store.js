import { observable, action } from 'mobx';
class HttpTest {
    @observable sitelist=null;
    @observable postTip=null;
    @observable authUrl="";
    @observable authValue="";
}
export default HttpTest;
