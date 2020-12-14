// 混合类型

// 接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

// 一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// 接口继承类

// 在下面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

// 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 
// 实际上， SelectableControl接口和拥有select方法的Control类是一样的。 
// Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。
class Control {
  // 把 private => public 并在 Class ImageC 中自己添加一个 public State 就不会报错
  // 但这一特殊需求 需要用 private，因为我们并不是为了不标红而做的这件事情。而是特定的需求场景
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class ImageC implements SelectableControl {
  select() { }
}

class LocationC {

}