/**
 * Created by admin on 2016/10/10.
 */
import axios from 'axios'

//  封装好的get和post接口，调用方法情况action文件
const instance = axios.create({
    timeout: 5000, //设置超时时间
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance
