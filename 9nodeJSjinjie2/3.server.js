const http=require('http');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');

http.createServer((req,res)=>{
  let {pathname}=url.parse(req.url);
  //获取文件修改时间
  fs.stat(`www${pathname}`,(err,stat)=>{
    if(err){
      res.writeHeader(404);
      res.write('Not Found');
      res.end();
    }else{
      //判断是否是第二次请求，用if-modified-since属性
      if(req.headers['if-modified-since']){
        let oDate=new Date(req.headers['if-modified-since']);
        let time_client=Math.floor(oDate.getTime()/1000);//获取秒
        let time_server=Math.floor(stat.mtime.getTime()/1000);
        //判断用户的资料是否比服务器资料旧
        if(time_client<time_server){//更新数据
          sendFileToClient();
        }else{
          //不需要更新
          res.writeHeader(304);
          res.write('no modified');
          res.end();
        }
      }else{
        //第一次请求，设置last-modified属性，然后更新数据
        res.setHeader('last-modified',stat.mtime.toUTCString());
        sendFileToClient();
      }
    }
    function sendFileToClient() {
      let rs=fs.createReadStream(`www${pathname}`);
      rs.on('error',err=>{
        res.writeHeader(404);
        res.write('not found');
        res.end();
      });
      let gz=zlib.createGzip();
      res.setHeader('content-encoding','gzip');
      rs.pipe(gz).pipe(res);
    }
  });
}).listen(8080);
