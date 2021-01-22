//两者相同
//第一种
let name = "xiaojing"
let obj1 ={
    name:name,
    getName:function(){
        return this.name;
    }
}
//第二种
let obj2 = {
    name,
    getName(){
        return this.name;
    }
}

//测试
console.log(obj1.getName());
console.log(obj2.getName());
