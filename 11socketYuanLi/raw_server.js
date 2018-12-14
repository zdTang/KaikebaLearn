const net=require('net');
const crypto=require('crypto');

let server=net.createServer(sock=>{
  console.log('连接');

  //握手一次，处理http头信息
  sock.once('data',data=>{
    console.log('hand shake start...');
    let str=data.toString();
    let lines=str.split('\r\n');

    //舍弃第一行和最后两行
    lines=lines.slice(1,lines.length-2);

    //切开
    let headers={};
    lines.forEach(line=>{
        let [key,value]=line.split(': ');
        headers[key.toLowerCase()]=value;

    });
    console.log(headers);

    //验证
    if(headers['upgrade']!='websocket'){
      console.log('其他协议',headers['upgrade']);
      sock.end();
    }else if(headers['sec-websocket-version']!=13){
      console.log('版本不对',headers['sec-websocket-version']);
      sock.end();
    }else{
      let key=headers['sec-websocket-key'];
      let mask='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

      //加密
      let hash=crypto.createHash('sha1');
      hash.update(key+mask);
      let key2=hash.digest('base64');

      sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${key2}\r\n\r\n`);

      console.log('hand shake end');

      sock.on('data',data=>{
        console.log('真正的数据');
        console.log(data);
      });
    }

  });


});
server.listen(8080);
