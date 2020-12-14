interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

interface Point { 
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 1, y: 2 }
// 创建后不可被修改
p1.x = 3

let a: number[] = [1,2,3,4]
let ro: ReadonlyArray<number> = a
ro[0] = 3
ro.push(5)
ro.length = 3
a = ro as number[]