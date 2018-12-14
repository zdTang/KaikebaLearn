const http=require('http');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');
const mysql=require('mysql');
const crypto=require('crypto');

//秘钥
const _key='sadfjskdjfkladsndva32432465kjae-wrt34-543u';
//建立连接
let db=mysql.createPool({
  host:'localhost',
  port:3306,
  user:'root',
  password:'',
  database:'nodejs1'
});

//密码加密
function md5(str){
  let obj=crypto.createHash('md5');
  obj.update(str);
  return obj.digest('hex');
}
function md5_2(str){
  return md5(md5(str)+_key);
}
//创建服务器
let server=http.createServer((req,res)=>{
  let {pathname,query}=url.parse(req.url,true);
  let {username,password}=query;

  //创建接口：
  switch (pathname) {
    case '/reg':
      //校验输入
      if(!username){
        res.write('{"err":1,"msg":"username can\'t be null"}');
        res.end();
      }else if(!password){
        res.write('{"err":1,"msg":"password can\'t be null"}');
        res.end();
      }else if(!/^\w{4,16}$/.test(username)){
        res.write('{"err":1,"msg":"username is invaild"}');
        res.end();
      }else if(/['|"]/.test(username)){
        res.write('{"err":1,"msg":"username is invaild"}');
        res.end();
      }else{
        db.query(`SELECT * FROM user WHERE username='${username}'`,(err,data)=>{
          if(err){
            res.write('{"err":1,"msg":"database error a"}');
            res.end();
          }else if(data.length>0){
            res.write('{"err":1,"msg":"username exits"}');
            res.end();
          }else{
            db.query(`INSERT INTO user (ID,username,password) VALUES(0,'${username}','${password}')`,(err,data)=>{
              if(err){
                res.write('{"err":1,"msg":"database error b"}');
                res.end();
              }else{
                res.write('{"err":0,"msg":"success"}');
                res.end();
              }
            });
          }
        });
      }
      break;
    case '/login':
    if(!username){
      res.write('{"err":1,"msg":"username can\'t be null"}');
      res.end();
    }else if(!password){
      res.write('{"err":1,"msg":"password can\'t be null"}');
      res.end();
    }else if(!/^\w{4,16}$/.test(username)){
      res.write('{"err":1,"msg":"username is invaild"}');
      res.end();
    }else if(/['|"]/.test(username)){
      res.write('{"err":1,"msg":"username is invaild"}');
      res.end();
    }else{
      db.query(`SELECT * FROM user WHERE username='${username}'`,(err,data)=>{
        if(err){
          res.write('{"err":1,"msg":"database error "}');
          res.end();
        }else if(data.length==0){
          res.write('{"err":1,"msg":"username is incorrect"}');
          res.end();
        }else if(data[0].password!=password){
          res.write('{"err":1,"msg":"password is incorrect"}');
          res.end();
        }else{
          res.write('{"err":0,"msg":"success"}');
          res.end();
        }
      });
    }
      break;
    default:
      let rs=fs.createReadStream(`www${pathname}`);
      let gz=zlib.createGzip();
      res.setHeader('content-encoding','gzip');
      rs.pipe(gz).pipe(res);
      rs.on('error',err=>{
        res.writeHeader(404);
        res.write('Not Found');
        res.end();
      });
  }
});
server.listen(8080);
