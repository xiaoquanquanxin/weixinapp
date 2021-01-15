//  补零
export function zeroFill(num){
    return num > 9 ? num : `0${num}`;
}


//  房间去重复
export function roomRemoveRepeat(data){
    //  房间去重复
    const roomListMap = {};
    const roomList = [];
    data.forEach(item => {
        const {roomId, roomName, cmdsId} = item;
        item.value = roomId;
        item.key = roomId;
        item.label = roomName;
        if (roomId && cmdsId && !roomListMap[roomId]) {
            roomListMap[roomId] = item;
        }
    });
    data.forEach((item) => {
        const {roomId} = item;
        if (roomListMap[roomId] === item) {
            roomList.push(item);
            delete roomListMap[roomId];
        }
    });
    console.log('roomList', roomList);
    return roomList;
}
