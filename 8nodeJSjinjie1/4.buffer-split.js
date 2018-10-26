let b=new Buffer('aaa,bbb,ccc,ddd,eee');
Buffer.prototype.split=Buffer.prototype.split||function(tag) {
  let cur=0;
  let result_arr=[];
  let n=0;
  while((n=this.indexOf(tag,cur))!=-1){//从cur位置开始找，找到tag所在位置并且赋值给n
    result_arr.push(this.slice(cur,n));//截取从cur位置到n的数据
    cur=n+tag.length;//把cur提前到n的位置
  }
  //放入最后一个
  result_arr.push(this.slice(cur));
  return result_arr;
}
let arr=b.split(',');
console.log(arr);
console.log(arr.map(buffer=>buffer.toString()));
