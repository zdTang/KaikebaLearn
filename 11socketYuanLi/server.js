const http=require('http');
const io=require('socket.io');

let httpServer=http.createServer((req,res)=>{});
httpServer.listen(8080);
let wsServer=io.listen(httpServer);
wsServer.on('connection',sock=>{
  sock.on('msg',str=>{
    sock.emit('msg',str);
  });
});
