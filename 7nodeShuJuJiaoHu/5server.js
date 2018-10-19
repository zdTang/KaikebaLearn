const http=require('http');
const url=require('url');
const querystring=require('querystring');
const fs=require('fs');

let server=http.createServer((req,res)=>{
  //Get
  let {pathname,query}=url.parse(req.url,true);
  //post
  let str='';
  req.on('data',data=>{
    str+=data;
  });
  let post={};
  let users={
    "jennypang":"123456"
  };
  req.on('end',()=>{
    post=querystring.parse(str);

    let {user,password}=query;

    //提示
    switch (pathname) {
      case '/reg'://注册
        if(!user){
          res.write('{"err":1,"msg":"user is required"}');
        }else if(!password){
          res.write('{"err":1,"msg":"password is required"}');
        }else if(!/^\w{8,32}$/.test(user)){//8-32位用户名
          res.write('{"err":1,"msg":,"invaild username"}');
        }else if(/^['|"]$/.test(password)){
          res.write('{"err":1,"msg":,"invaild password"}');
        }else{
          users[user]=password;
          res.write('{"err":0,"msg":"success"}');
        }
        console.log(user,password);
        res.end();
        break;
      case '/login':
      if(!user){
        res.write('{"err":1,"msg":"user is required"}');
      }else if(!password){
        res.write('{"err":1,"msg":"password is required"}');
      }else if(!/^\w{8,32}$/.test(user)){//8-32位用户名
        res.write('{"err":1,"msg":,"invaild username"}');
      }else if(/^['|"]$/.test(password)){
        res.write('{"err":1,"msg":,"invaild password"}');
      }else if(!users[user]){
        res.write('{"err":1,"msg":,"no this user"}');
      }else if(users[user]!=password){
        res.write('{"err":1,"msg":,"user or password is incorrect"}');
      }else{
        res.write('{"err":0,"msg":,"login success"}');
      }
      console.log(user,password);
      res.end()
        break;
      default:
        fs.readFile(`www${pathname}`,(err,data)=>{
          if(err){
            res.writeHeader(404);
            res.write("not found");
          }else {
            res.write(data);
          }
          res.end();
        });
    }
  })
});
server.listen(8080);
