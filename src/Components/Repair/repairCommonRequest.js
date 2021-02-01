import {ipUri} from "../../config";

//  1：物业 2：地产
const reportResponsibility = '2';

//  http://asm-test.seedland.cc:8084/life-web/sso/api/workorder需要的header
export const createHeader = () => {
    //  todo    公众号的信息？
    const appkey = '7AYzorn2RSbhED2K';
    const appSecret = 'JSWdDBcDY62tL3hrVWTl5EylNnh2FHrY';
    const t = Date.now();
    return {
        appkey,
        t,
        sign: window.md5(`${appkey}_${t}_${appSecret}`).toUpperCase(),
    }
};
//  拿客诉详情
export const getWorkOrder = async (id) => {
    return new Promise(function (resolve, reject){
        window.JQ.ajax({
            type: "get",
            url: `${ipUri["/wpi"]}/getWorkOrder`,
            contentType: "application/x-www-form-urlencoded",
            headers: createHeader(),
            data: {
                id,
                // 工单id (不必填)
                workId: "",
                // 1：物业   2：地产 (不必填)
                reportResponsibility,
            },
            success: (result) => {
                resolve(result);
            }
        })
    });
};

//  客诉处理状态历史接口
export const taskHistory = async (id) => {
    return await new Promise(function (resolve, reject){
        const data = {
            id,
            // 工单id (不必填)
            workId: "",
            // 1：物业   2：地产 (不必填)
            reportResponsibility,
        };
        window.JQ.ajax({
            crossDomain: true,
            type: "get",
            headers: createHeader(),
            url: `${ipUri["/wpi"]}/taskHistory`,
            data,
            success: (response) => {
                resolve(response);
            }
        })
    });
};

//  工单进度跟踪接口
export const progressTracking = async (id) => {
    return await new Promise(function (resolve, reject){
        window.JQ.ajax({
            crossDomain: true,
            type: "get",
            headers: createHeader(),
            url: `${ipUri["/wpi"]}/progressTracking`,
            data: {id},
            success: (response) => {
                resolve(response);
            }
        })
    });
};

//  查看评价（新）
export const newViewReviews = async (id) => {
    return await new Promise(function (resolve, reject){
        const data = {
            id,
            reportResponsibility,
        };
        window.JQ.ajax({
            crossDomain: true,
            type: "get",
            headers: createHeader(),
            url: `${ipUri["/wpi"]}/newViewReviews`,
            data,
            success: (response) => {
                resolve(response);
            }
        })
    });
};


//	评价项 (新)
export const newEvaluationItems = async () => {
    return await new Promise(function (resolve, reject){
        window.JQ.ajax({
            crossDomain: true,
            type: "get",
            headers: createHeader(),
            url: `${ipUri["/wpi"]}/newEvaluationItems`,
            data: {reportResponsibility},
            success: (response) => {
                resolve(response);
            }
        })
    });
};

//	提交评价
export const submitScore = async (data, evaluateParams) => {
    return await new Promise(function (resolve, reject){
        window.JQ.ajax({
            crossDomain: true,
            type: "POST",
            headers: createHeader(),
            url: `${ipUri["/wpi"]}/submitScore?evaluateParams=${evaluateParams}`,
            data,
            success: (response) => {
                resolve(response);
            }
        })
    });
};


