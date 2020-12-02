import React from 'react'
import {Icon} from 'antd-mobile';
import Mybutton from '../../../pub/MyButton';
import './Component.less'
class ProjectSelect extends React.Component {
    componentDidMount() {
        window.setWindowTitle("委托选房")
    }
    render() {
        const { Foldval, Fold, ProjectSelectfun, ProjectSelecData, ProjectSelectval, ProjectSelectOK}=this.props;
        let changeRight = {
            display: Foldval ? 'block' : 'none'
        }
        //console.log(11,ProjectSelecData)
        return <div className={"Components-ProjectSelect-container"} style={changeRight}>
            <div className={"title"}><span>公司项目</span><span onClick={() => { Fold(Foldval)}}>折叠</span></div>
            <div className={"ul"}>
                {
                    ProjectSelecData && ProjectSelecData.map((v,i)=>{
                        return(
                            <div key={i} className={"li"} onClick={() => { ProjectSelectfun(i, v) }}>
                                <span>{v.batchName}</span>
                                {i==ProjectSelectval?<Icon type={"check"} color={'#3890F9'} />:""}
                            </div>
                        )
                    })
                }
            </div>
            <div className={"btn"} onClick={() => { ProjectSelectOK(Foldval)}}>
                <Mybutton type={'blue'} label="确定" />
            </div>
        </div>;
    }
}
export default ProjectSelect