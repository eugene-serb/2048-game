'use strict';

export class GridDrawer {
  constructor(container, width, height) {
    this.$container = container;
    this.matrix_width = width;
    this.matrix_height = height;

    this.matrix = this.generateMatrix(this.matrix_width, this.matrix_height);
    this.draw();
  }

  generateMatrix = (matrix_width, matrix_height) => {
    let matrix = new Array();
    for (let x = 0; x < matrix_width; x++) {
      matrix[x] = new Array();
      for (let y = 0; y < matrix_height; y++) {
        matrix[x][y] = 0;
      }
    }
    return matrix;
  };

  draw = () => {
    this.$container.innerHTML = '';

    let $map = document.createElement('div');
    $map.classList.add('map');
    this.$container.appendChild($map);

    for (let y = this.matrix_height - 1; y >= 0; y--) {
      for (let x = 0; x < this.matrix_width; x++) {
        let $cell = document.createElement('div');
        $cell.classList.add('cell');
        $cell.setAttribute('x', x);
        $cell.setAttribute('y', y);
        $map.appendChild($cell);
      }
    }
  };
}

export default GridDrawer;
