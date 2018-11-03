const http=require('http');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');

http.createServer((req,res)=>{
  let {pathname}=url.parse(req.url);
      fs.stat(`www${pathname}`,(err,stat)=>{
        if(err){
          console.log('读取失败');
          res.setHeader(404);
          res.write('not found');
          res.end();
        }else{
          res.setHeader('last-modified',stat.mtime.toUTCString());
          res.setHeader('content-encoding','gzip');
          let rs=fs.createReadStream(`www${pathname}`);
          let gz=zlib.createGzip();
          rs.pipe(gz).pipe(res);
          rs.on('error',err=>{
            if(err){
              console.log('读取失败');
              res.setHeader(404);
              res.write('not found');
              res.end();
            }
          });
        }

  });
}).listen(8080);
