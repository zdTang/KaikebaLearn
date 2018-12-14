const http=require('http');
const fs=require('fs');
const url=require('url');
const mysql=require('mysql');
const zlib=require('zlib');
const crypto=require('crypto');

const _key="jadsjfkosjdiaewkf234j23io5j43lndfaj";

function md5(str) {
    let obj=crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
}


function md5_2(str) {
  return md5(md5(str)+_key);

}

//连接数据库
let db=mysql.createPool({
  host:'localhost',
  port:3306,
  user:'root',
  password:'',
  database:'nodejs1'
});

let server=http.createServer((req,res)=>{
  let {pathname,query}=url.parse(req.url,true);
  let {username,password}=query;

  //选择端口
  switch (pathname) {
    case '/reg'://注册端口
      //用户名验证:1.用户名非空 2.密码非空 3.用户名 4-16位字母数字 4.用户名不含有' "  5.查询数据库是否存在此用户名
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
            db.query(`INSERT INTO user (ID,username,password) VALUES(0,'${username}','${md5_2(password)}')`,(err,data)=>{
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
    case '/login'://登陆端口
    //用户名验证:1.用户名非空 2.密码非空 3.用户名 4-16位字母数字 4.用户名不含有' "  5.查询数据库是否存在此用户名
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
          res.write('{"err":1,"msg":"database error c"}');
          res.end();
        }else if(data.length==0){
          res.write('{"err":1,"msg":"username is incorrect"}');
          res.end();
        }else{
          if(data[0].password!=md5_2(password)){
            res.write('{"err":1,"msg":"password is incorrect"}');
            res.end();
          }else{
            res.write(`{"err":0,"msg":"success"}`);
            res.end();
          }
        }
      })
    }
      break;
    default:
    //缓存
      //获取文件修改时间
      fs.stat(`www${pathname}`,(err,stat)=>{
        if(err){
          res.writeHeader(404);
          res.write('not found');
          res.end();
        }else{
            //判断是第一次还是第二次请求，第二次请求有[if-modified-since]属性
            if(req.headers['if-modified-since']){//第二次请求
              //获取旧的文件的时间
              let oDate=new Date(req.headers['if-modified-since']);
              let time_client=Math.floor(oDate.getTime()/1000);
              let time_server=Math.floor(stat.mtime.getTime()/1000);

              //判断
              if(time_client<time_server){
                //如果客户文件，比server文件早，旧，则更新
                sendFileToClient();
              }else{
                //不需要更新数据
                res.writeHeader(304);
                res.write('no modified');
                res.end();
              }
            }else{
              //第一次请求
              //设置头信息
              res.setHeader('last-modified',stat.mtime.toUTCString());
              sendFileToClient();
            }
        }
      });

      function sendFileToClient() {
        //常规请求静态文件
          let rs=fs.createReadStream(`www${pathname}`);
          let gz=zlib.createGzip();
          res.setHeader('content-encoding','gzip');
          rs.pipe(gz).pipe(res);
          rs.on('error',err=>{
            if(err){
              res.writeHeader(404);
              res.write('not found');
              res.end();
            }
          });
      }

  }

});
server.listen(8080);
