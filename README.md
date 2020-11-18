all in `https://www.tslang.cn/docs/handbook/`

## 相对之前不清楚的一些概念

### 类型断言
断言:  让编辑器相信自己，我比你更懂这个变量是什么类型

```ts

let someValue : any = 'this is a string'
// 尖括号语法
let strLength: number = (<string>someValue).length
// 下面这种比较友好 as 语法
let strLength1: number = (someValue as string).length
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

### 重载

天啦，typeScript 也有重载概念拉

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```


### 泛型

```ts
function identity<T>(arg: T): T {
  return arg
}
// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity3: GenericIdentityFn = identity;
// 将类型定在声明时的泛型接口
interface GenericIdentityFn1<T> {
  (arg: T): T
}

let myIdentity4: GenericIdentityFn1<number> = identity

console.log(myIdentity4(3))
// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
// 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 类型兼容性
很少用的不做记录
```ts
interface Named {
  name: string
}
class Person {
  name: string
}
let p: Named
// same structural typing
p = new Person()
```
如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性。比如：
```ts
interface Named {
    name: string;
}

let x: Named;
// y 的推断类型为 { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
```
