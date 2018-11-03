const fs=require('fs');

fs.stat('./www/1ul_test.html',(err,stat)=>{
  if(err){
    console.log('读取失败');
  }else{
    console.log(stat.mtime.toGMTString());
  }
})
