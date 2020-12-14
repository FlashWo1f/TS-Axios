// 函数类型接口
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function (src: string, sub: string) {
  let result = src.search(sub)
  return result > -1
}


class Animal { 
  name: string
}

class Dog extends Animal {
  breed: string
}

// 可索引类型
interface NumberDictionary { 
  [index: string]: number,
  age: number,
  // 报错，跟 [index: string]: number 冲突
  name: string,
}

interface ReadonlyStringArray {
  readonly [index: number] :string
}

let myArray: ReadonlyStringArray = ['bob', 'alice']
myArray[1] = 'ok'