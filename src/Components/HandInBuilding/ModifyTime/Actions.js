import {action } from 'mobx';
import { Modal, Toast } from 'antd-mobile';//Toast.info('提交成功', 1.5);
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
    init=()=>{
        //初始化store变量，都放这里
    }
    @action
    selectTimefun = (e, i,v)=>{
        //console.log(i, v.calendarId)
        e.preventDefault()
        this.store.selectTimeval = i
        this.store.calendarId = v.calendarId
    }
    @action
    isLeap = (y) => {
        if ((y % 4 === 0) && (y % 100 !== 0 || y % 400 === 0)){
            return 1
        }else{
            return 0
        }
    }
    @action
    dayi = (y, m, mm, daydata, Totalnum)=>{
        //console.log(y, m, mm,999)
        let dayi = 1;
        if (dayi <= mm) {
            for (; dayi <= mm;) {
                //70
                if (daydata.length == Totalnum) {
                    return daydata
                }
                daydata.push(y + "-" + m + "-" +dayi)
                dayi++;
            }
        }
    }
    @action
    day = (Totalnum) => {
        
        let daydata = []
        let today = new Date()
        let y = today.getFullYear()
        let m = today.getMonth()
        let d = today.getDate()
        let day = new Date(y, m, d)
        let dayOfWeek = day.getDay()
        let startdata = d - dayOfWeek
       // console.log("isLeap", y, this.isLeap(y), day)

        let days_per_month = new Array(31, 28 + this.isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        
        console.log("startdata", startdata, d , dayOfWeek)
        //startdata=-1
        if (startdata > 0) {
            if (startdata <= days_per_month[m]) {
                for (;startdata <= days_per_month[m]; ) {
                    daydata.push(y + "-" + (m + 1)+"-"+startdata)
                    startdata++;
                }
            } 
            //console.log(88,y,m, m+1,days_per_month[m], daydata)
            //m+2是下个月，小于13是今年，大于13是明年
           // console.log("下个月是",m+2)
           // console.log("daydata",daydata)
            if (daydata.length <= Totalnum){
                for(let i=0;3>i;i++){
                    if(m+2+i<13){
                        this.dayi(y, m + 2 + i, days_per_month[m + 1 + i], daydata, Totalnum)
                    }
                }
                let yearflag=1
                for (let k = 0; 3 > k; k++) {
                    if (13 <= m + 2+k < 25&&yearflag==1) {
                        y = y + 1
                        days_per_month = new Array(31, 28 + this.isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
                        yearflag = yearflag+1
                    }
                    if (13<=m + 2 + k<25) {
                        this.dayi(y, k + 1, days_per_month[k], daydata, Totalnum)
                    }
                }
            }
            // if(m+2<13){
            //     this.dayi(y,m+2,days_per_month[m + 1], daydata)
            // }
            // if(m+3<13){
            //     this.dayi(y, m+3,days_per_month[m + 2], daydata)
            // }
            // if(m+2>=13){
            //     this.dayi(y+1,1,days_per_month[0], daydata)
            //     this.dayi(y+1, 2,days_per_month[1], daydata)
            // }
           

        } else {
            console.log(m,9999)
            if(m-1<0){
                let startdataii = days_per_month[12 - 1] + startdata
                if (startdataii <= days_per_month[12 - 1]) {
                    for (; startdataii <= days_per_month[12 - 1];) {
                        daydata.push(y-1 + "-" + 12 + "-" + startdataii)
                        startdataii++;
                    }
                }
            }
            if(m-1>=0){
                let startdataii = days_per_month[m - 1] + startdata
                if (startdataii <= days_per_month[m - 1]) {
                    for (; startdataii <= days_per_month[m - 1];) {
                        daydata.push(y + "-" + m + "-" + startdataii)
                        startdataii++;
                    }
                }
            }
            
            if (daydata.length <= Totalnum) {
                for (let i = 0; 3 > i; i++) {
                    if (m + 1 + i < 13) {
                        this.dayi(y, m + 1+i, days_per_month[m + i], daydata, Totalnum)
                        //this.dayi(y, m + 2 + i, days_per_month[m + 1 + i], daydata, Totalnum)
                    }
                }
                
                let yearflag = 1
                for (let k = 0; 3 > k; k++) {
                    if (13 <= m + 2 < 25 && yearflag==1) {
                        y = y + 1
                        days_per_month = new Array(31, 28 + this.isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
                        yearflag = yearflag+1
                    }
                    if (13 <= m + 2 + k < 25) {
                       // this.dayi(y + 1, 1, days_per_month[0], daydata, Totalnum)
                        this.dayi(y, k + 1, days_per_month[k], daydata, Totalnum)
                    }
                }
            }
            // if(m+1<13){
            //     this.dayi(y, m + 1, days_per_month[m], daydata, Totalnum)
            // }
            // if(m+2<13){
            //     this.dayi(y, m + 2, days_per_month[m + 1], daydata, Totalnum)
            // }
            // if(m+1>=13){
            //     this.dayi(y + 1, 1, days_per_month[0], daydata,Totalnum)
            //     this.dayi(y + 1, 2, days_per_month[1], daydata, Totalnum)
            // }
        }
        return daydata
    }
    @action
    ModifyTimefun = async ()=>{
        //初始化
        this.store.selectTimeval=-1
        this.store.calendarId = -1
        //初始化
        let cformData = {
            orderDetailId: JSON.parse(window.getLocalData("orderDetailId")),
        };
        let result = await window.GET({ url: "auth/orderTimes", cformData });
        if (!result.isSucess) return;
        this.store.ModifyTimeData = result.data;
       // console.log(21121212,this.day())
        let daydata = this.day(this.store.TotalNum).reduce((prev, cur, index, arr) => {
            prev[index]={ day: cur, fullFlag:-1}
            return prev
        }, [])
        
        for (let i = 0; daydata.length>i;i++){
            for (let ii = 0; this.store.ModifyTimeData.calendarInfo.length>ii;ii++){
                if (daydata[i].day.split("-")[0] == this.store.ModifyTimeData.calendarInfo[ii].day.split("-")[0]) {
                    if (parseInt(daydata[i].day.split("-")[1]) == parseInt(this.store.ModifyTimeData.calendarInfo[ii].day.split("-")[1])){
                        if (parseInt(daydata[i].day.split("-")[2]) == parseInt(this.store.ModifyTimeData.calendarInfo[ii].day.split("-")[2])) {
                                daydata[i].fullFlag = this.store.ModifyTimeData.calendarInfo[ii].fullFlag
                                daydata[i].timeSlot = this.store.ModifyTimeData.calendarInfo[ii].timeSlot
                        }
                    }
                }
            }
        }
        this.store.day = daydata
        //console.log("day", daydata)//显示时间是否正确
        this.store.wordTimeSlot = result.data.wordTimeSlot.reduce((prev, cur, index, arr)=>{
            if (arr.length == index+1){
                return prev + cur.startTimeSlot + "-" + cur.endTimeSlot
            }else{
                return prev + cur.startTimeSlot + "-" + cur.endTimeSlot+"，"
            }
        },'')
        
    }
    @action
    itemdayfun=(e,v,i)=>{
        // this.store.itemclass
        this.store.timeSlot=[]
        this.store.calendarId=-1
        this.store.selectTimeval=-1
        this.store.itemclassval = i;
        this.store.timeSlot = v.timeSlot
            
        console.log(123, v, this.store.ModifyTimeData.calendarInfo,i)
    }
    @action
    submitfun = async(history)=>{

        console.log(this.store.calendarId,history)
        if (this.store.calendarId>0){
            Modal.alert('提示', "您是否确认修改预约时间？", [
            {
                text: '取消', onPress: () => {
                }
            }, 
            {
                text: '确定', onPress: async() => {
                        let cformData = {
                                calendarId: this.store.calendarId,
                                orderDetailId: JSON.parse(window.getLocalData("orderDetailId"))
                        }
                        let result = await window.POST({ url: "auth/updateOrderTime", cformData });
                        if (!result.isSucess) return;
                        history.push("/HandInBuildingTimeSuccess")
                        }
                    }
                ])
            
        }else{
            Toast.info('未选择日期或者时间段', 1.5);
        }
        
    }
    @action
    morefun=()=>{
        this.store.TotalNum=this.store.TotalNum==42?70:42;
        console.log("TotalNum", this.store.TotalNum)
        this.ModifyTimefun()
    }
}
export default Actions;
