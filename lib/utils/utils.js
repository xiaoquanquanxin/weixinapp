/**
 * @return {string}
 */
export function Encrypt(phone){
    const CryptoJS = window.CryptoJS;
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(phone),
        CryptoJS.enc.Utf8.parse('HaChiSmart++++++'),
        {
            iv: CryptoJS.enc.Utf8.parse('A-16-Byte-String'),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString();
}

//  更新用户信息
export function upDateUserInfo(auth, userInfo, authTime){
    console.log('更新用户信息');
    if (auth) {
        window.setLocalData('auth', auth);
    }
    if (userInfo) {
        window.setLocalData('userInfo', userInfo);
    }
    if(authTime){
        window.setLocalData('authTime', new Date().getTime());
    }
}


