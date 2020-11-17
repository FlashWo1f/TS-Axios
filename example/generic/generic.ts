// 泛型
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>('myString')
// 类型推断 推荐 
let output1 = identity('mySTRING')


function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

// 泛型函数类型
let myIdentity: <T>(arg: T) => T = identity

// 我们还可以使用带有调用签名的对象字面量来定义泛型函数：
let myIdentity2: { <T>(arg: T): T } = identity;

// 泛型接口

interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity3: GenericIdentityFn = identity;

interface GenericIdentityFn1<T> {
  (arg: T): T
}

let myIdentity4: GenericIdentityFn1<number> = identity

console.log(myIdentity4(3))

// 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

// 泛型约束
// 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：

interface Lengthwise {
  length: number;
}

function loggingIdentityLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  // Now we know it has a .length property, so no more error
  return arg;
}

// 在泛型里面使用类类型

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!