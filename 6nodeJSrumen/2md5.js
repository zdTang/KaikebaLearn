const crypto=require("crypto");
let obj=crypto.createHash('md5');//算法名

obj.update('123');//把123加密
obj.update('4');//把1234加密
console.log(obj.digest('hex'));//obj加密后的结果用数字显示出来（十六进制）
