console.log('templateFn/templateFn/templateFn/templateFn');
module.exports = {
    templateFn(randBuildDirname){
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>加载中..</title>
    <meta http-equiv="Access-Control-Allow-Origin" content="*"/>
    <meta charset="utf-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link type="favicon" rel="shortcut icon" href="favicon.ico"/>
    <script>
        try {
            window.getQueryString = function (name){
                const aftername = window.location.href.split("?")[1];
                if (aftername && aftername.length > 1) {
                    const arr = aftername.split("&");
                    const obj = {};
                    for (let i = 0; i < arr.length; i++) {
                        const tem = arr[i].split('=');
                        if (tem.length === 2) {
                            obj[tem[0]] = tem[1];
                        }
                    }
                    return obj;
                }
                return null;
            };
            const arg = window.getQueryString();
            let url = "";
            if (arg) {
                if (arg.url) {
                    url = decodeURIComponent(arg.url);
                }
                let pre = "";
                if (url.indexOf('/') !== 0) {
                    pre = "/"
                }
                const tem = [];
                for (let k in arg) {
                    if (k !== "url") tem.push(k + "=" + arg[k]);
                }
                if (tem.length > 0) {
                    url = "#" + pre + url + "?" + tem.join("&")
                } else {
                    url = "#" + pre + url
                }
            }
            // console.log("url:",url)
            console.log("${randBuildDirname}/" + url);
            console.log("url1:", url);
            url = url.replace(/__jh__/g, "#");
            url = url.replace(/##/g, "#");
            //url=url.replace(/#\\/\\//g, "#/")
            console.log("url2:", url);
            // window.location.replace("${randBuildDirname}/"+url);
            window.location.replace("/wechat-pay/${randBuildDirname}/" + url);
        } catch (err) {
            alert("錯誤信息" + JSON.stringify(err) + e)
        }
    </script>
</head>
<body>
</body>
</html>
`;
    }
};

