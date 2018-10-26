const http=require('http');
const fs=require('fs');
const zlib=require('zlib');

http.createServer((req,res)=>{
  let rs=fs.createReadStream(`www${req.url}`);
  res.setHeader('content-encoding','gzip');
  let gz=zlib.createGzip();
  rs.pipe(gz).pipe(res);
  rs.on('error',error=>{
    res.writeHeader(404);
    res.write('not founds',error);
    res.end();
  });

}).listen(8080);
