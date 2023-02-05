'use strict';

import Gameloop from '@/gameloop.js';
import GridDrawer from '@/grid-drawer.js';
import Timer from '@/timer.js';
import Score from '@/score.js';
import Rating from '@/rating.js';
import Tile from '@/tile.js';
import Keyboard from '@/keyboard.js';
import Gamepad from '@/gamepad.js';
import Touchscreen from '@/touchscreen.js';
import { getRandomInteger } from '@/helpers.js';

export class Game2048 extends Gameloop {
  constructor(params) {
    super();

    this._params = params;

    this.SPEED_RATE = (this._params?.speedRate &&
      typeof this._params?.speedRate === 'number'
    ) ? this._params?.speedRate : 1000;

    this.KEY_RATING = (this._params?.keyRating &&
      typeof this._params?.keyRating === 'string'
    ) ? this._params?.keyRating : 'es:2048';

    this.#DOMs();
    this.#configurations();
    this.#eventListeners();
    this.#init();
  }

  moveToLeft() {
    this.#move('Left');
  }

  moveToUp() {
    this.#move('Up');
  }

  moveToRight() {
    this.#move('Right');
  }

  moveToDown() {
    this.#move('Down');
  }

  start() {
    super.start();
    this.interval = setInterval(this.#eventLoop.bind(this), this.SPEED_RATE);
  }

  setGameOver() {
    super.setGameOver();

    const score = this.score.value;
    const time = this.timer.value;

    this.rating.add(score, time);
    this.drawRating();
  }

  clear() {
    super.clear();
    this.#init();
  }

  drawRating() {
    this.$RATING.innerHTML = '';

    const rating = this.rating.value;

    for (let i = 0; i < rating.length && i < 10; i++) {
      const row = document.createElement('tr');
      const a = document.createElement('td');
      const b = document.createElement('td');
      const c = document.createElement('td');
      const d = document.createElement('td');

      const time = new Date(rating[i].date)

      a.innerText = i + 1;
      b.innerText = rating[i].score;
      c.innerText = rating[i].time;
      d.innerText = time.toLocaleDateString();

      row.append(a, b, c, d);

      this.$RATING.appendChild(row);
    }
  }

  #init() {
    this.rating = new Rating(this.KEY_RATING);
    this.drawRating();

    this.$DIALOG.innerHTML = 'Get 2048!';

    this.timer = new Timer();
    this.score = new Score();

    this.drawer = new GridDrawer(this.$MAP, this.MATRIX_WIDTH, this.MATRIX_HEIGHT);
    this.tiles = this.drawer.matrix;

    this.#addNewTile();
    this.#addNewTile();
    this.#countScore();

    this.#draw();
  }

  #eventLoop() {
    this.#draw();
  }

  #draw() {
    this.drawer.draw();

    for (let x = 0; x <= 3; x++) {
      for (let y = 0; y <= 3; y++) {
        if (this.tiles[x][y] !== 0) {
          this.tiles[x][y].draw();
        }
      }
    }

    this.$SCORE.innerText = `Score: ${this.score.value}`;
    this.$TIMER.innerText = `Time: ${this.timer.value}`;
  }

  #addNewTile() {
    if (this.#emptyCellsChecker() === 0) return;

    let emptyCells = new Array();

    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) {
          emptyCells.push([x, y]);
        }
      }
    }

    let random = getRandomInteger(0, emptyCells.length);
    let cost = 2 * getRandomInteger(1, 3);
    let x = emptyCells[random][0];
    let y = emptyCells[random][1];

    this.tiles[x][y] = new Tile(x, y, cost);
  }

  #emptyCellsChecker() {
    let count = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) count++;
      }
    }
    return count;
  }

  #countScore() {
    let totalScore = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] !== 0) {
          totalScore += this.tiles[x][y].cost;
        }
      }
    }

    this.score.value = totalScore;
  }

  #progressChecker() {
    let movements = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) {
          movements++;
        }
        if (y < 3) {
          if (this.tiles[x][y].cost === this.tiles[x][y + 1].cost) {
            movements++;
          }
        }
        if (x < 3) {
          if (this.tiles[x][y].cost === this.tiles[x + 1][y].cost) {
            movements++;
          }
        }
      }
    }
    if (movements === 0) {
      this.$DIALOG.innerText = 'Game Over!';
      this.setGameOver();
    }
  }

  #updateCoordinates() {
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] !== 0) {
          this.tiles[x][y].x = x;
          this.tiles[x][y].y = y;
        }
      }
    }
  }

  #shrink(line) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 0) {
        line.splice(i, 1);
        i--;
      }
    }
    if (line.length > 1) {
      line.forEach((item, index) => {
        if (line[index - 1] !== undefined) {
          if (item.cost === line[index - 1].cost) {
            line[index - 1].cost *= 2;
            line.splice(index, 1);
          }
        }
      });
    }
    for (let i = 1; i <= 4; i++) {
      if (line.length != 4) {
        line.push(0);
      }
    }
    return line;
  }

  #move(direction) {
    let countChanges = 0;

    for (let x = 0; x <= 3; x++) {
      let mutableLine = [];
      let originalLine = [];

      switch (direction) {
        case 'Up':
          for (let y = 3; y >= 0; y--) {
            mutableLine.push(this.tiles[x][y]);
            originalLine.push(this.tiles[x][y]);
          }
          break;
        case 'Down':
          for (let y = 0; y <= 3; y++) {
            mutableLine.push(this.tiles[x][y]);
            originalLine.push(this.tiles[x][y]);
          }
          break;
        case 'Left':
          for (let y = 0; y <= 3; y++) {
            mutableLine.push(this.tiles[y][x]);
            originalLine.push(this.tiles[y][x]);
          }
          break;
        case 'Right':
          for (let y = 3; y >= 0; y--) {
            mutableLine.push(this.tiles[y][x]);
            originalLine.push(this.tiles[y][x]);
          }
          break;
      }

      mutableLine = this.#shrink(mutableLine);

      for (let i = 0; i <= mutableLine.length; i++) {
        if (mutableLine[i] !== originalLine[i]) {
          countChanges++;
        }
      }

      switch (direction) {
        case 'Up':
          for (let y = 3; y >= 0; y--) {
            this.tiles[x][y] = mutableLine.shift();
          }
          break;
        case 'Down':
          for (let y = 0; y <= 3; y++) {
            this.tiles[x][y] = mutableLine.shift();
          }
          break;
        case 'Left':
          for (let y = 0; y <= 3; y++) {
            this.tiles[y][x] = mutableLine.shift();
          }
          break;
        case 'Right':
          for (let y = 3; y >= 0; y--) {
            this.tiles[y][x] = mutableLine.shift();
          }
          break;
      }
    }

    this.#updateCoordinates();
    this.#draw();

    if (countChanges > 0) {
      this.#addNewTile();
    }

    this.#draw();
    this.#countScore();
    this.#progressChecker();
  }

  #configurations() {
    this.MATRIX_WIDTH = 4;
    this.MATRIX_HEIGHT = 4;
  }

  #DOMs() {
    this.$MAP = document.querySelector('#map');
    this.$SCORE = document.querySelector('#score');
    this.$TIMER = document.querySelector('#timer');
    this.$DIALOG = document.querySelector('#dialog');
    this.$RATING = document.querySelector('#rating');
  }

  #eventListeners() {
    this._keyboard = new Keyboard(this);
    this._gamepads = new Gamepad(this);
    this._touchscreen = new Touchscreen(this, this.$MAP);
  }
}

export default Game2048;
