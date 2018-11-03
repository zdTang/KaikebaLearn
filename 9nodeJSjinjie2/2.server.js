const http=require('http');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');

http.createServer((req,res)=>{
  let {pathname}=url.parse(req.url);
  fs.stat(`./www${pathname}`,(err,stat)=>{
    if(err){
      console.log('读取失败');
      res.writeHeader(404);
      res.write('读取失败');
      res.end();
    }else{
      //判断是否是第二次请求，有没有if-modified-since属性
      if(req.headers['if-modified-since']){
        let oDate=new Date(req.headers['if-modified-since']);
        let time_client=Math.floor(oDate.getTime()/1000);
        let time_server=Math.floor(stat.mtime.getTime()/1000);
        //如果client的时间比server前，则需要更新
        if(time_client<time_server){
          sendFileToClient();
        }else{
          //如果不更新则返回304
          res.writeHeader(304);
          res.write('Not Modified');
          res.end();
        }
        //
      }else{
        //设置last-modified属性
        res.setHeader('last-modified',stat.mtime.toUTCString());
        sendFileToClient();
      }
    }
    function sendFileToClient() {
      let rs=fs.createReadStream(`www${pathname}`);
      rs.on('error',err=>{
        if(err){
          //console.log("读取失败")；
          res.writeHeader(404);
          res.write("not found");
        }
      });
      let gz=zlib.createGzip();
      res.setHeader('content-encoding','gzip');
      rs.pipe(gz).pipe(res);
    }
  });
}).listen(8080);
