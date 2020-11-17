// 泛型
function identity(arg) {
    return arg;
}
var output = identity('myString');
// 类型推断 推荐 
var output1 = identity('mySTRING');
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// 泛型函数类型
var myIdentity = identity;
// 我们还可以使用带有调用签名的对象字面量来定义泛型函数：
var myIdentity2 = identity;
var myIdentity3 = identity;
var myIdentity4 = identity;
console.log(myIdentity4(3));
