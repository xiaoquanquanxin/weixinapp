/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react'
/*antd-mobile*/
// import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { Modal} from 'antd-mobile';
/*当前页面用到的*/
//https://github.com/VicEcho/VDraggable
//https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event

/*自定义类*/
import './Component.less'
export default class DragTest extends React.Component {
    componentDidMount() {
        //console.log('[TemplateNoMbox] componentDidMount..')
        window.setWindowTitle("DragTest")
    }
    state = {
        data:[
            {
                id:"a1",
                title:"div1",
                sort:0,
                key:1
            },
            {
                id:"a2",
                title:"div2",
                sort:1,
                key:2
            },
            {
                id:"a3",
                title:"div3",
                sort:2,
                key:3
            },
            {
                id:"a4",
                title:"div4",
                sort:3,
                key:4
            },
        ]
    }
    curretnTarget
    setMoveTarge(e){
        let $=window.JQ
        let touch=e.touches[0]
        var x = touch.clientX;
        var y = touch.clientY;
        var top=y+"px"
        e.target.style="top:"+top+";";
        e.target.className ="row-item startMove";
        var $target=$(e.target)
        this.curretnTarget={
            y:y,
            target:$target
        }
        var arr=$('.Components-DragTest-container').find('.row-item')
        var THIS=this;
        arr.each(function () {
            let $item=window.JQ(this);
            let temTop=$item.offset().top
            // console.log($item.index()+"-"+$item.html()+",temTop:"+temTop+",y:"+y+","+(y>temTop))
            if (y>temTop){
                THIS.clear$cloneTip()
                THIS.$cloneTip=window.JQ("<div class='dragSpaceTip'></div>")
                if ($item.index()==1){
                    $item.before(THIS.$cloneTip);
                }else{
                    $item.after(THIS.$cloneTip);
                }

            }
        })
    }
    clear$cloneTip(){
        if (this.$cloneTip) this.$cloneTip.remove()
    }
    onTuchStart(e){
        e.target.className ="row-item startMove";
        // console.log("e.target:",e.target)
        this.clear$cloneTip();
        this.$cloneTip=window.JQ("<div class='dragSpaceTip'></div>")
        window.JQ(e.target).before(this.$cloneTip)
        this.setMoveTarge(e)
    }
    onTouchmove(e){
        // console.log("e.originalEvent:",e)
        // console.log(e.touches[0].clientX,e.touches[0].clientY);
        this.setMoveTarge(e)
    }
    onTouchend(e){
        e.target.className ="row-item endMove";
        if (this.curretnTarget){
            // this.curretnTarget.target.remove()
            this.$cloneTip.before(this.curretnTarget.target)
            this.clear$cloneTip();
            //打印出新的排序
            var $=window.JQ
            var arr=$('.Components-DragTest-container').find('.row-item')
            var THIS=this;
            var newData=[];
            arr.each(function () {
              var $item=$(this)
                var id=$item.attr("dataid")
                var data=THIS.state.data
                for (var i=0;i<data.length;i++){
                  if (data[i].id==id){
                      newData.push(data[i])
                  }
                }
            })
            Modal.alert('重新排序',JSON.stringify(newData))
        }
    }
    render() {
        let {data}=this.state
        return <div className={"Components-DragTest-container"}>
            <h3>模板-DragTest</h3>
        {data.map((item)=> {
            return <div key={item.key} dataid={item.id} className="row-item"
            onTouchStart={this.onTuchStart.bind(this)}
            onTouchEnd={this.onTouchend.bind(this)}
            onTouchCancel={this.onTouchend.bind(this)}
            onTouchMove={this.onTouchmove.bind(this)}
            >{item.title}</div>
        })}
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}