// 类实现接口
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) {

  }
  setTime(d: Date) {
    this.currentTime = d
  }
}


interface ClockConstructor {
  new (hour: number, minute: number)
}

// error
class Clock1 implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) { }
}