const http=require('http');
const common=require('./libs/common');
const fs=require('fs');
const uuid=require('uuid/v4');

let server=http.createServer((req,res)=>{
  let arr=[];

  req.on('data',data=>{
    //console.log("test");
    arr.push(data);
  });
  req.on('end',()=>{
    let data=Buffer.concat(arr);

    let post={};
    let files={};
    //首先获取分隔符，分隔符在req.headers里面
    //'content-type':
  // 'multipart/form-data; boundary=----WebKitFormBoundarygYaQBWRAjFkuDlqo',
    if(req.headers['content-type']){
      let str=req.headers['content-type'].split('; ')[1];//用; 隔开，要第二个元素
      if(str){
        //注意header里的boundary比数据里的少两个横杠
        let boundary="--"+str.split('=')[1];

        //1.用<分隔符>隔开数据
        let arr=data.split(boundary);
        //console.log(arr);

        //2.去掉数组里头尾无用元素
        arr.shift();
        arr.pop();


        //3.去掉数组每个元素开头和结尾的换行符 ,/r/n各占一位
        arr=arr.map(buffer=>buffer.slice(2,buffer.length-2));

        //4.用第一次出现/r/n/r/n来切分数据
        arr.forEach(buffer=>{
          let n=buffer.indexOf('\r\n\r\n');

          let disposition=buffer.slice(0,n);
          let content=buffer.slice(n+4);


          //通过disposition中是否有/r/n区分普通数据和文件数据
          if(disposition.indexOf('\r\n')==-1){//普通数据
            //获取name:
            disposition=disposition.toString();
            content=content.toString();
            let name=disposition.split('; ')[1].split('=')[1];
            name=name.substring(1,name.length-1);
            post[name]=content;
            console.log(post);

          }else{//文件数据
            disposition=disposition.toString();
            let [disp1,disp2]=disposition.split('\r\n');
            let [,name,filename]=disp1.split('; ');
            let type=disp2.split(': ')[1];

            name=name.split('=')[1];
            name=name.substring(1,name.length-1);

            filename=filename.split('=')[1];
            filename=filename.substring(1,filename.length-1);

            let random_name=uuid().replace(/\-/g,'');
            let path='upload/'+random_name;

            fs.writeFile(path,content,err=>{
              if(err){
                console.log('文件写入失败',err);
              }else{
                console.log('成功');
                files[name]={filename,path,type};
                console.log(files);
              }
            });
            // console.log(random_name);
            // console.log(name,filename,type);

          }
        });
      }
    }
  });
});
server.listen(8080);
