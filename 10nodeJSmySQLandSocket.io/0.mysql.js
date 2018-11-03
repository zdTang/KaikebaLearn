const mysql=require('mysql');

//连接
let db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  port:'3306',
  database:'nodejs1'
});
//操作
db.query(`INSERT INTO user (ID,name,age,password) VALUES (0,'jenny',22,'asdfas');`,(err,data)=>{
  if(err){
    console.log('插入失败',err);
  }else{
    console.log(data);
  }
});
