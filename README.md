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