function ajax(options) {
  options=options||{};
  options.type=options.type||'get';
  options.data=options.data||{};
  options.dataType=options.dataType||'text';
  //1.创建
  if(XMLHttpRequest){
    var xhr=new XMLHttpRequest();
  }else{
    var xhr=new ActiveXObject("Microsoft-XMLHttp");
    //上述XHR对象不兼容ie6,所以使用插件ActiveXObject加载
  }
  //处理数据
  let arr=[];
  for(let key in options.data){
    arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`);
  }
  let strData=arr.join('&');
  //2.连接
  if(options.type=="get"){
      xhr.open(options.type,options.url+"?"+strData,true);
      xhr.send();
  }else{
    xhr.open(options.type,options.url,true);
      //声明数据格式，否则后台解析不出格式
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //3.发送请求
    xhr.send(strData);
  }
  //4.接收数据
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if(xhr.status>=200&&xhr.status<300||xhr.status==304){
        //获取数据
        let data=xhr.responseText;
        switch(options.dataType){
          case 'json':
          if(windwo.JSON&&JSON.prase){
            data=JSON.parse(data);
          }else{
            data=eval('('+str+')');
          }
          break;
          case 'xml':
          data=xhr.responseXML;
          break;
        }
        options.success && options.success(xhr.responseText);
      }else {
        options.error && options.error();
      }
    }
  }
}
