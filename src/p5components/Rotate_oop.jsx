import React from "react"
import Sketch from "react-p5"

const Rotate_oop = () => {

  const Offset = 42
  const Usize = 42

  class Something {
    constructor(r, c, size) {
      this.offset = Offset
      this.r = r
      this.c = c
      this.size = size
    }

    _rotate(p5) { // passing p5 instance HERE, let p5.func get through
      p5.push()
      p5.translate(this.c, this.r)
      let angle = p5.atan2(p5.mouseY - this.r, p5.mouseX - this.c)
      p5.rotate( angle )
      p5.rect(0, 0, 0, this.offset)
      p5.pop()
    }
  }

  let unit_size = Usize
  let things = []
  let R, C // used later in draw

  const setup = (p5, canvasParentRef) => {

    /* // - Considered putting class definition HERE - 
    class Something {
      constructor(r, c, size) {
        this.offset = Offset
        this.r = r
        this.c = c
        this.size = size
      }
  
      _rotate() {
        p5.push()
        p5.translate(this.c, this.r)
        let angle = p5.atan2(p5.mouseY - this.r, p5.mouseX - this.c)
        p5.rotate(angle)
        p5.rect(0, 0, 0, this.offset)
        p5.pop()
      }
    }
    */

    p5.createCanvas(800, 800).parent(canvasParentRef)
    
    p5.rectMode(p5.CENTER)
    p5.angleMode(p5.DEGREES)
    p5.noStroke()
    const Bright_gold = p5.color(250,215,0,100)
    R = p5.height / unit_size
    C = p5.width / unit_size
    let r = -1
    p5.stroke(250, 210, 0, 120)
    while (++r < R) {
      let c = -1
      things[r] = []
      while (++c < C) {
        p5.fill(Bright_gold)
        things[r][c] = new Something(
          unit_size / 2 + r * unit_size,
          unit_size / 2 + c * unit_size,
          unit_size
        )
      }
    }
  }

  const draw = (p5) => {
    p5.background(0)
    let r = -1, c
    while (++r < R) {
      c = -1
      while (++c < C) {
        things[r][c]._rotate(p5) // passing p5 instance HERE, let p5.func get through
      }
    }
  }
  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default Rotate_oop
