// const express=require('express');
// const body=require('body-parser');
// const multer=require('multer');
//
// let server=new express();
// //中间件
// server.use(body.urlencoded({extended:false}));
// let multerObj=multer({dest:'./upload/'});
// server.use(multerObj.any());
//
// server.listen(8080);

const express=require('express');
const body=require('body-parser');//处理普通post数据
const multer=require('multer');//处理文件post数据

let server=new express();
server.listen(8080);

//中间件
server.use(body.urlencoded({extended:false}));//使用body中间件
let multerObj=multer({dest:'./upload/'});//设置multer存储文件的路径
server.use(multerObj.any());

//处理请求
server.post('/api',(req,res)=>{
  if(req.headers['origin']=='null'||req.headers['origin'].startsWith('http://localhost')){
    res.setHeader('Access-Control-Allow-Origin','*');
  }
  res.send('ok');
  console.log(req.body);//普通POST数据
  console.log(req.files);//文件post数据
});
server.use(express.static('./www/'));
