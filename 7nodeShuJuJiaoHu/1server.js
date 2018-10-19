const http=require('http');
const fs=require('fs')
let server=http.createServer((req,res)=>{
  fs.readFile(`www${req.url}`,(err,data)=>{
    if(err){
      res.writeHeader(404);
      res.write("not found");
    }else{
      res.write(data);
    }
    res.end();
  })
});
server.listen(8080);
