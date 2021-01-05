// 交叉类型是将多个类型合并为一个类型。

function extend<T, U> (first: T, second: U): T & U {
  let result = <T & U>{}
  for (let id in first) {
    (<any>result)[id] = (<any>second)[id]
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result
}

class Person {
  constructor(public name: string) { }
}

interface Loggable {
  log(): void;
}

class ConsoleLogger implements Loggable {
  log() {
      // ...
  }
}

let jim = extend(new Person('JIM'), new ConsoleLogger())

// | 符号

function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", 2);

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

// 使用类型断言
let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors

// if ((<Fish>pet).swim) {
//   (<Fish>pet).swim();
// }
// else {
//   (<Bird>pet).fly();
// }

//  类型保护
// 我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet的类型
// 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
}
else {
  pet.fly();
}