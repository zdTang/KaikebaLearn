const http=require('http');
const io=require('socket.io');

//创建连接http
let httpServer=http.createServer((req,res)=>{});
httpServer.listen(8080);

//创建连接socket
let wsServer=io.listen(httpServer);

//socket数组
let aSock=[];

//监听sock的创建的连接，获得一个sock对象
wsServer.on('connection',sock=>{
  //把监听到的这个连接放入sock数组
  aSock.push(sock);

  //监听断开连接
  sock.on('disconnect',()=>{
    //删除aSock里面，断开的这个连接
    let n=aSock.indexOf(sock);
    if(n!=-1){
      aSock.splice(n,1);
    }
  });

  //接受数据
  sock.on('msg',str=>{
    //向每一个连接发送msg数据
    aSock.forEach(s=>{
      if(s!=sock){
        s.emit('msg',str);
      }
    });
  })
});
