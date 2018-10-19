const http=require('http');
const fs=require('fs');
let server=http.createServer((req,res)=>{
  // res.write("hhh");
  fs.readFile(`www${req.url}`,(err,data)=>{
    if(err){
      res.write("404");
    }else{
      res.write(data);
    }
    res.end();
  });

});
server.listen(8080);
