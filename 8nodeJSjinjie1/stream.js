let http=require('http');
let zlib=require('zlib');
let fs=require('fs');

let rs=fs.createReadStream('jquery.js');
let ws=fs.createWriteStream(`jquery.js.zip`);
let gz=zlib.createGzip();
rs.pipe(gz).pipe(ws);
rs.on('error',err=>{
  console.log('读取失败');
});
ws.on('finish',()=>{
  console.log('写入完成')
})
