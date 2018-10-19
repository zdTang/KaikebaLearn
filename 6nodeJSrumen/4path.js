const path=require('path');
let str="www/learn/pic.png";
console.log(path.dirname(str));//  www/learn
console.log(path.basename(str));// pic.png
console.log(path.extname(str));// .png
