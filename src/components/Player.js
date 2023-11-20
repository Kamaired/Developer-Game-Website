import React, {useRef} from "react"

export const Player = {
  el: {},
  x: 200,
  y: 100,
  speed: 2,
  move() {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
};

export default function PlayerController() {
  }