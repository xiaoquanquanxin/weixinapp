/**
 * @return {string}
 */
export function Encrypt(phone){
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(phone),
        CryptoJS.enc.Utf8.parse('HaChiSmart++++++'),
        {
            iv: CryptoJS.enc.Utf8.parse('A-16-Byte-String'),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString();
}


