import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable NoticeData = ''
    @observable Birthdate=''
    @observable Sexdate=''
    @observable Agedate=''

    @observable Interestselects=[]
    @observable renList = [{ name: '打篮球' }, { name: 'n2' }, { name: 'n3' }]

    @observable UserInfodata = []
    @observable paramArr=[]
    @observable authshow = ""
    @observable citylist = [{
        "label": "北京市",
        "value": "110000",
        "children": [{
            "label": "北京市",
            "value": "110100",
            "children": [{
                "label": "东城区",
                "value": "110101",
                "children": []
            }]
        }]
    }]
}
export default Store;
