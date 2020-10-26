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
// 枚举 可以看ts 是如何编译枚举类型的
var _Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Bule"] = 45] = "Bule";
})(_Color || (_Color = {}));
