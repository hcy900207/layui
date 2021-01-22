let res = {errcode:0,data:{a:1,b:2}};

//深层结构
let {errcode:code,data:{a,b}} = res;

console.log(code);
console.log(a);
console.log(b);

function foo (age,name) {
    console.log(age,name); 
}
foo({name:"xiaojing",age:18});