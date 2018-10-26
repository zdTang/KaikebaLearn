let a=new Buffer('abc');
let b=new Buffer('efg');
let c=Buffer.concat([a,b]);
console.log(c);
