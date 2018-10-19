const url=require("url");
let obj=url.parse("https://www.baidu.com:8080/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=aa&rsv_pq=f80d982000063ffb&rsv_t=6498LAZdRZjq9v4v0h",true);
console.log(obj);
