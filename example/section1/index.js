var isDone = true;
var decLiteral = 20;
var hexLiteral = 0x14;
var binaryLiteral = 20;
var myname = 'bob';
var yourname = 'libin';
var age = 21;
var sentence = "Hello, my name is " + yourname + ".\n\nI will be " + (age + 1) + " years old next season.";
// 推荐第一种
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
// 元组： 元素数量和类型的一个数组
// 比如下面规定这样一个数组：数量为2 第一个类型为 string 第二个类型为 number
var x = ['hel', 2];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Bule"] = 45] = "Bule";
})(Color || (Color = {}));
var c = Color.Bule;
var d = Color.Green;
var e = Color[1];
console.log('c', c); // 45
console.log('d', d); // 1
console.log('e', e); // 'Green'
// 枚举 可以看ts 是如何编译枚举类型的 达到可正查可反查
var _Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Bule"] = 45] = "Bule";
})(_Color || (_Color = {}));
function nouser() {
    console.log('void');
}
var union = '3';
union = 2;
// never 类型 它是所有类型的子类型，也就意味着它可以赋值给所有类型
// never 类型表示的是那些永不存在的值的类型。 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('something wrong');
}
function infinityLoop() {
    while (true) { }
}
create({ prop: 0 });
create(null);
// 断言:  让编辑器相信自己，我比你更懂这个变量是什么类型
var someValue = 'this is a string';
// 尖括号语法
var strLength = someValue.length;
// 下面这种比较友好 as 语法
var strLength1 = someValue.length;
