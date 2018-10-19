function deepClone(obj) {
  let objClone=Array.isArray(obj)?[]:{};//如果obj是数组就把objClone定义为数组，否则定义为对象
  if(obj && typeof obj==="obj"){
    for(key in obj){
      if(obj.hasOwnProperty(key)){//使用 hasOwnProperty 方法判断属性是否存在
        //判断obj子元素是否为对象，如果是，递归复制
        if(obj[key]&&typeof obj[key]==="object"){
          objClone[key]=deepClone(obj[key]);
        }else{
          objClone[key]=obj[key];
        }
      }
    }
  }
  return objClone;
}

//concat和slice是假的深复制，只会复制一层
//concat原来是原来连接多个数组的，如果没有参数，则创建一个新的数组与原来数组一样，缺点，只能复制一层，若数组里
//若数组里还有数组或者对象，则无法成功深复制（因为同样只把它的堆地址赋给新数组）
//slice原来是划分数组，同concat,slice() 方法可从已有的数组中返回选定的元素。
//该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。
