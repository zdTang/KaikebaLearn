const event=require("events").EventEmitter;

let ev=new event();

//1.监听(接收)
ev.on('msg',function(a,b,c){
  console.log('收到了msg事件',a,b,c);
});

//2.派发（发送）
ev.emit('msg',1,2,5);
