const http=require('http');
const querystring=require('querystring');
let server=http.createServer((req,res)=>{
  let str='';
  req.on('data',data=>{
    str+=data;
  });
  req.on('end',()=>{
    let post=querystring.parse(str);
    console.log(str,post);
    res.end();
  })
});
server.listen(8080);
