interface ClockInterface1 {
  tick()
}

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface1
}

function createClock(ctx: ClockConstructor, hour: number, minute: number): ClockInterface1 {
  return new ctx(hour, minute)
}

class DigitalClock implements ClockInterface1 {
  constructor(h: number, m: number) {

  }
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface1 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}

const digital = createClock(DigitalClock, 12, 7)
const analog = createClock(AnalogClock, 7, 32)