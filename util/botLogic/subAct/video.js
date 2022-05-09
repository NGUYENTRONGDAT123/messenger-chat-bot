const queue = require('../global').queue

let name = {
    "Đào Nhật": "PHANH",
    "Đào Nhật Phan Anh": "PHANH",
    "Nguyen Trong": "DAT",
    "Nguyen Trong Dat": "DAT",
    "Đức": "NGUYEN",
    "Đức Anh": "NGUYEN"
}
let stat = {
    DAT: [],
    NGUYEN: [],
    PHANH: []
}

//handle video submission
function handleVideo(sub){
    let id = sub.id
    let nameID = name[senderName]
    if(stat[nameID].includes(id)==false){
        stat[nameID].push(id)
    }
}

module.exports = handleVideo
