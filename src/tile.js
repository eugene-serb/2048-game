'use strict';

export class Tile {
  constructor(x, y, cost) {
    this.x = x;
    this.y = y;
    this.cost = cost;

    this.draw();
  }

  draw() {
    document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add('tile', 'tile-' + this.cost);
    document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).innerText = this.cost;
  }
}

export default Tile;
