const http=require('http');
const url=require('url');
const querystring=require('querystring');
let server=http.createServer((req,res)=>{
  //Get
  let {pathname,query}=url.parse(req.url,true);
  //post
  let str='';
  req.on('data',data=>{
    str+=data;
  });
  req.on('end',()=>{
    let post=querystring.parse(str);
    console.log(pathname,query,post);
  });

  res.end();
});
server.listen(8080);
