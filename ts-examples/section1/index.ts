let isDone: Boolean = true

let decLiteral: Number = 20
let hexLiteral: Number = 0x14
let binaryLiteral: Number = 0b10100

let myname: string = 'bob'

let yourname: string = 'libin'
let age: number = 21

let sentence = `Hello, my name is ${yourname}.

I will be ${age + 1} years old next season.`

// 推荐第一种
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]

// 元组： 元素数量和类型的一个数组
// 比如下面规定这样一个数组：数量为2 第一个类型为 string 第二个类型为 number
let x: [string, number] = ['hel', 2]


// 枚举

enum Color {
  Red,
  Green,
  Bule = 45,
}

let c: Color = Color.Bule
let d: Color = Color.Green
let e: string = Color[1]
console.log('c', c) // 45
console.log('d', d) // 1
console.log('e', e) // 'Green'

// 枚举 可以看ts 是如何编译枚举类型的 达到可正查可反查
var _Color;
(function (Color) {
  Color[Color["Red"] = 0] = "Red";
  Color[Color["Green"] = 1] = "Green";
  Color[Color["Bule"] = 45] = "Bule";
})(_Color || (_Color = {}));



function nouser(): void {
  console.log('void')
}

let union: number | string = '3'
union = 2

// never 类型 它是所有类型的子类型，也就意味着它可以赋值给所有类型
// never 类型表示的是那些永不存在的值的类型。 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。

function error(message: string): never {
  throw new Error(message)
}

function fail() {
  return error('something wrong')
}

function infinityLoop(): never {
  while (true) { }
}

// declare 声明关键字
declare function create(o: object | null): void

create({ prop: 0 })
create(null)


// 断言:  让编辑器相信自己，我比你更懂这个变量是什么类型

let someValue : any = 'this is a string'
// 尖括号语法
let strLength: number = (<string>someValue).length
// 下面这种比较友好 as 语法
let strLength1: number = (someValue as string).length