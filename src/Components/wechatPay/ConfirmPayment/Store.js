import {observable} from 'mobx';

//  定义数据结构
class Store {
    //  选中订单id-解析url
    @observable billIDsList = [];
    //  选择订单id的map形式
    @observable billIDsMap = [];
    //  选中订单列表  渲染
    @observable billList = [];
    //  选中订单列表  提交
    @observable billDetails = [];
    //  当前房间
    @observable currentRoom = {};
    //  总金额
    @observable totalMoney = 0;


    //  物管接口返回的数据
    @observable submitOrderData = null;
    //  订单详情 完成订单时需要的参数
    @observable orderDate = null;
}

export default Store;
