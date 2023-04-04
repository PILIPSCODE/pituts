const randomString = (oi) => {
let random = ''
let characther ='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz'
for(let i= 0; i < oi;i ++){
    random += characther.charAt(Math.floor(Math.random() * characther.length))
}
return random
}



let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let date= cDay + "-" + cMonth + "-" + cYear 

let currentTime = new Date();
let time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();


module.exports = {randomString,date,time}