const assert=require("assert");

function sum(a,b){
  assert(arguments.length==2,'必须传递两个参数');
  assert(typeof a=='number','第一个参数必须是数字');
  assert(typeof b=='number','第二个参数必须是数字');

  return a+b;
}
//console.log(sum(5));//必须传递两个参数
//console.log(sum('a',5));//'第一个参数必须是数字'
//console.log(sum(5,'a'));//
console.log(sum(1,2));
