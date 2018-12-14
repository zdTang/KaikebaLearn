let http=require('http');

http.createServer((req,res)=>{
  res.end();
  res.write('1234');
}).listen(8080);
