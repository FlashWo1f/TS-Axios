class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter1 = new Greeter("world");
console.log(greeter1.greet())

class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    // super 关键字 调用父类的构造函数！！ 从而实现父类中的 成员 name 被赋值
    // 在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    // super. 的方式 引用到父类的属性
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);


// 公共，私有与受保护的修饰符
// 默认为 public

class Animal1 {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

new Animal1("Cat").name; // 错误: 'name' 是私有的.


class Animal2 {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal2 {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal2("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.

// protected修饰符与 private修饰符的行为很相似，但有一点不同， `protected成员在派生类中仍然可以访问`。


// 我们先检查用户密码是否正确，然后再允许其修改员工信息。 
// 我们把对 fullName的直接访问改成了可以检查密码的 set方法。 我们也加了一个 get方法，让上面的例子仍然可以工作

// tsc example/Class/class.ts --target es5
let passcode = "secret passcode";

class Employee2 {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    }
    else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee33 = new Employee2();
employee33.fullName = "Bob Smith";
if (employee33.fullName) {
  alert(employee33.fullName);
}