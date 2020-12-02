//视频单元
import React from 'react'
import playtip from './playtip.png'
let VideoItem=(props) => {
    let isclose=!!props.close
    return <div className={"am-flexbox-item"}>
        <div className={"am-image-picker-item"}>
            {isclose&&<div className={"am-image-picker-item-remove"} onClick={()=>props.close(props.data)}>
            </div>}
            <div className={"am-image-picker-item-content"} onClick={()=>props.click(props.data)}>
                <img src={playtip}  className={"am-image-picker-item-content"}/>
            </div>
        </div>
    </div>
}
export default VideoItem