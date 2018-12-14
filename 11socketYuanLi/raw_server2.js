const net=require('net');
const crypto=require('crypto');

//连接；
let server=net.createServer(sock=>{
  //接受http数据
  sock.once('data',data=>{
    console.log('hand shake start...');
    //处理http数据
    let str=data.toString();
    let lines=str.split('\r\n');
    lines=lines.slice(1,lines.length-2);
    let headers={};
    lines.forEach(line=>{
      let [key,value]=line.split(': ');
      headers[key.toLowerCase()]=value;
    });
    //验证（协议升级）
    if(headers['upgrade']!='websocket'){
      console.log('其他协议',headers['upgrade']);
    }else if(headers['sec-websocket-version']!=13){
      console.log('其他版本',headers['sec-websocket-version']);
    }else{
      //生成sec-websocket-accept并且返回客户端信息
      let key=headers['sec-websocket-key'];
      let mask='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

      let hash=crypto.createHash('sha1');
      hash.update(key+mask);
      let key2=hash.digest('base64');

      //给客户端返回信息
      //101 表示协议切换
      sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: upgrade\r\nSec-WebSocket-Accept: ${key2}\r\n\r\n`);
      console.log('hand shake end...');

      //处理真正的数据：帧数据
      sock.on('data',data=>{
        console.log('有数据');

        let FIN=data[0]&0x001;
        let opcode=data[0]&0x0F0;
        let mask=data[1]&0x001;
        let payload=data[1]&0x0FE;

        console.log(FIN,opcode,mask,payload);
      });
    }


  });
});

server.listen(8080);
