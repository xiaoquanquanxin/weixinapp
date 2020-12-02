export default class Storage {
    setData(key, data) {
        data = JSON.stringify(data)
        //console.log('setData',key,data)
        return localStorage.setItem(key, data);
    }
    getData(key) {
        let data=localStorage.getItem(key);
        //console.log('getData',key,data)
        return data
    }
    del(key) {
        //console.log('del',key)
        localStorage.removeItem(key);
    }
    clear() {
        //console.log('clear')
        localStorage.clear()
    }
}
