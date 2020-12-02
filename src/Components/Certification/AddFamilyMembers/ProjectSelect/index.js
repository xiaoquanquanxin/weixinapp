import React from 'react'
import {Icon} from 'antd-mobile';
import Mybutton from '../../../pub/MyButton';
import './Component.less'
import  gouIcon  from './gou-icon.png';

class ProjectSelect extends React.Component {
    componentDidMount() {
        window.setWindowTitle("委托选房")
    }

    state = {
        selects: [],
        renList: [{ name: 'n1' }, { name: 'n2' }, { name: 'n3' }],
    }
    handleCheck = ({ roomName }) => {
        this.setState(({ selects }) => ({
            selects: selects.includes(roomName)
                ? selects.filter(item => item !== roomName)
                : [...selects, roomName],
        }))
    }


    render() {
        const { Foldval, Fold, ProjectSelectfun, ProjectSelecData, ProjectSelectval, ProjectSelectOK, ProjectSelectvalarr}=this.props;
        let changeRight = {
            display: Foldval ? 'block' : 'none'
        }
        const { selects: selects, renList } = this.state
        //console.log(11, ProjectSelecData, ProjectSelectvalarr)
        return <div className={"Components-ProjectSelect-container"} style={changeRight}>
            {/* <div className={"title"}><span>公司项目</span><span onClick={() => { Fold(Foldval)}}>折叠</span></div> */}
            <div className={"ul"}>
                {
                //     ProjectSelecData && ProjectSelecData.map((v,i)=>{
                //         return(
                //             <div key={i} className={"li"} 
                //             onClick={() => { 
                //                 console.log(123, v.editStatus?1:2)
                //                     ProjectSelectfun(v, i) 
                // }}>
                //                 <span>{v.roomName}</span>
                //                 {i==ProjectSelectval ? <Icon type={"check"} color={'#3890F9'} />:""}
                //                 {/* <Icon type={"check"} color={'#3890F9'} /> */}
                //             </div>
                //         )
                //     })
                }
                {ProjectSelecData && ProjectSelecData.map((v, i) => {
                    return (
                        <div key={i} >
                            <div className={"li"} 
                                onClick={() => ProjectSelectfun(v, i)}
                            >
                                <span>{v.roomName}</span>
                                {ProjectSelectvalarr.includes(v.roomName) ? <img src={gouIcon} /> : ""}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={"btn"} onClick={() => { ProjectSelectOK(Foldval)}}>
                <Mybutton type={'blue'} label="确定" />
            </div>
            
        </div>;
    }
}
export default ProjectSelect