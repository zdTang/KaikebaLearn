function ajax(url,data={},type="get",success,error) {


  //处理数据
  let arr=[];
  for(let key in data){
    arr.push(`${key}=${data[key]}`);
  }
  let strData=arr.join('&');
  //1.创建

  if(XMLHttpRequest){
    var xhr=new XMLHttpRequest();

  }else{
    var xhr=new ActiveXObject("Microsoft-XMLHttp");
    //上述XHR对象不兼容ie6,所以使用插件ActiveXObject加载
  }
  //2.连接

  if(type=="get"){
      xhr.open(type,url+"?"+strData,true);
      xhr.send();
  }else{
    xhr.open(type,url,true);
      //声明数据格式，否则后台解析不出格式
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //3.发送请求
    xhr.send(strData);
  }


  //4.接收数据
  xhr.onreadystatechange=function(){

    if(xhr.readyState==4){
      if(xhr.status>=200&&xhr.status<300||xhr.status==304){
        success(xhr.responseText);
      }else {
        error();
      }
    }
  }
}
