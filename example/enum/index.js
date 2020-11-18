// 枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
var a = Direction.Right;
console.log(a);
console.log(Direction[3]);
var Res;
(function (Res) {
    Res[Res["No"] = 0] = "No";
    Res[Res["Yes"] = 1] = "Yes";
})(Res || (Res = {}));
function respond(recipient, message) {
    // ...
}
respond("Princess Caroline", Res.Yes);
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
var c = {
    kind: ShapeKind.Circle,
    radius: 100
};
var E;
(function (E) {
    E[E["Foo"] = 0] = "Foo";
    E[E["Bar"] = 1] = "Bar";
})(E || (E = {}));
// function f(x: E) {
//   if (x !== E.Foo || x !== E.Bar) {
//       //             ~~~~~~~~~~~
//       // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
//   }
// }
