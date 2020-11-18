// 枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

declare enum Enum {
  A = 1,
  B,
  C = 2
}

const a =  Direction.Right

console.log(a)
console.log(Direction[3])

enum Res {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: Res): void {
  // ...
}

respond("Princess Caroline", Res.Yes)

enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle,
  radius: number,
}

interface Square {
  kind: ShapeKind.Square,
  sideLength: number
}

let c: Circle = {
  kind: ShapeKind.Circle,
  radius: 100,
}

enum E {
  Foo,
  Bar,
}

// function f(x: E) {
//   if (x !== E.Foo || x !== E.Bar) {
//       //             ~~~~~~~~~~~
//       // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
//   }
// }
