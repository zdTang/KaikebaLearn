// const http=require('http');
// const urlLib=require('url');
// const querystring=require('querystring');
//
// http.createServer((req,res)=>{
//   //get
//   let {pathname:url,query:get}=urlLib.parse(req.url,true);//定义pathname的别名：url，query的别名：get
//
//   //post
//   let arr=[];
//   req.on('data',data=>{
//     arr.push(data);
//   });
//   //处理数据
//   req.on('end',()=>{
//     let post=querystring.parse(Buffer.concat(arr).toString());
//     console.log(url,get,post);
//     res.write('dsafdfsadf');
//     res.end();
//   });
// }).listen(8080);

let http=require('http');
let urlLib=require('url');
let querystring=require('querystring');

let server=http.createServer((req,res)=>{
    //get
    let {pathname:url,query:get}=urlLib.parse(req.url,true);
    //定义pathname为URL的别名，get为query的别名

    //POST
    let arr=[];
    req.on('data',data=>{
      arr.push(data);
    });

    //处理数据
    req.on('end',()=>{
      let post=querystring.parse(Buffer.concat(arr).toString());
      console.log(url,get,post);
      res.write('是打发点');
      res.end();
    })
});
server.listen(8080);
