const express=require('express');
const body=require('body-parser');
const multer=require('multer');

let server=new express();
server.listen(8080);

//中间件
server.use(body.urlencoded({extended:false}));
let multerObj=multer({dest:'./upload/'});//存储路径
server.use(multerObj.any());

//处理请求
server.post('/api',(req,res)=>{
  if(req.headers['origin']=='null'||req.headers.startsWith('http://localhost')){
    res.setHeader('Access-Control-Allow-Origin','*');//允许跨域

  }
  res.send('OK');
  console.log(req.body);
  console.log(req.files);
});

//处理静态页面
server.use(express.static('./www/'));
