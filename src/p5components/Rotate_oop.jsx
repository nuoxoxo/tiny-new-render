import React, { useEffect, useRef } from "react"
import p5 from "p5"

const Offset = 42
const Usize = 42

const Rotate_oop = () => {

  const renderRef = useRef()

  useEffect(() => {

    const sketch = (p) => {
      class Something {
        constructor(r, c, size) {
          this.offset = Offset
          this.r = r
          this.c = c
          this.size = size
        }

        _rotate() {
          p.push()
          p.translate(this.c, this.r)
          let angle = p.atan2(p.mouseY - this.r, p.mouseX - this.c)
          p.rotate(angle)
          p.rect(0, 0, 0, this.offset)
          p.pop()
        }
      } // Something ends

      let things = []
      let R, C // used later in draw

      p.setup = () => {
        // p.createCanvas(800, 800).parent(canvasParentRef) // react-p5
        p.createCanvas(800, 800).parent(renderRef.current)

        p.rectMode(p.CENTER)
        p.angleMode(p.DEGREES)
        p.noStroke()
        const Bright_gold = p.color(250, 215, 0, 100)
        R = p.height / Usize
        C = p.width / Usize
        let r = -1
        p.stroke(250, 210, 0, 120)
        while (++r < R) {
          let c = -1
          things[r] = []
          while (++c < C) {
            p.fill(Bright_gold)
            things[r][c] = new Something(
              Usize / 2 + r * Usize,
              Usize / 2 + c * Usize,
              Usize
            )
          }
        }
      } // setup ends

      p.draw = () => {
        p.background(0)
        let r = -1,
          c
        while (++r < R) {
          c = -1
          while (++c < C) {
            things[r][c]._rotate(p5) // passing p5 instance HERE, let p.func get through
          }
        }
      } // draw ends
    }

    const p5sketch = new p5(sketch)
    return () => {
      p5sketch.remove() // this way we avoid infinite re-rendering
    }
  }, []) // useEffect ends

  return (
    <div ref={renderRef}></div>
  )
}

export default Rotate_oop
