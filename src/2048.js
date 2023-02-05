'use strict';

import Score from '@/score.js';
import Timer from '@/timer.js';
import Tile from '@/tile.js';
import Map from '@/map.js';
import { getRandomInteger } from '@/helpers.js';

export class Game2048 {
  constructor() {
    this.#configurations();
    this.#DOMs();
    this.#eventListeners();

    this.init();
  }

  init = () => {
    this.map = new Map(this.$MAP, this.MATRIX_WIDTH, this.MATRIX_HEIGHT);
    this.timer = new Timer();
    this.score = new Score();

    this.tiles = this.map.matrix;
    this.#addNewTile();
    this.#addNewTile();
    this.#countScore();

    this.draw();

    this.$DIALOG.innerHTML = 'Get 2048!';
    this.interval = setInterval(this.draw, 1000);
  };

  draw = () => {
    this.map.draw();

    for (let x = 0; x <= 3; x++) {
      for (let y = 0; y <= 3; y++) {
        if (this.tiles[x][y] !== 0) {
          this.tiles[x][y].draw();
        }
      }
    }

    this.$SCORE.innerText = `Score: ${this.score.value}`;
    this.$TIMER.innerText = `Time: ${this.timer.value}`;
  };

  #addNewTile = () => {
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
  };

  #emptyCellsChecker = () => {
    let count = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) count++;
      }
    }
    return count;
  };

  #countScore = () => {
    let totalScore = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] !== 0) {
          totalScore += this.tiles[x][y].cost;
        }
      }
    }

    this.score.value = totalScore;
  };

  #progressChecker = () => {
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
      clearInterval(this.interval);
    }
  };

  #updateCoordinates = () => {
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] !== 0) {
          this.tiles[x][y].x = x;
          this.tiles[x][y].y = y;
        }
      }
    }
  };

  #shrink = (line) => {
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
  };

  #move = (direction) => {
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
    this.draw();

    if (countChanges > 0) {
      this.#addNewTile();
    }

    this.draw();
    this.#countScore();
    this.#progressChecker();
  };

  #keyboard = () => {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        this.#move('Up');
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        this.#move('Down');
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.#move('Left');
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.#move('Right');
      } else if (e.code === 'KeyR') {
        clearInterval(this.interval);
        this.init();
      }
    });
  };

  #gamepads = () => {
    const checkGamepadSupport = () => {
      return 'getGamepads' in window.navigator;
    };
    const addGamepad = () => {
      if (!checkGamepadSupport()) {
        return;
      }
      window.addEventListener('gamepadconnected', () => {
        const update = () => {
          keyPressInterval += 10;
          let gamepads = navigator.getGamepads();
          let isPressed = false;
          let button;
          gamepads[0].buttons.forEach((item, index) => {
            if (item.value === 1) {
              button = index;
              isPressed = true;
            }
          });
          if (!isPressed) {
            return;
          } else {
            gamepadHandler(button);
          }
        };
        gamepadInterval = setInterval(update, 10);
      });
    };

    const gamepadHandler = (button) => {
      if (keyPressInterval >= 250) {
        switch (button) {
          case 3:
            clearInterval(this.interval);
            this.init();
            break;
          case 12:
            this.#move('Up');
            break;
          case 13:
            this.#move('Down');
            break;
          case 14:
            this.#move('Left');
            break;
          case 15:
            this.#move('Right');
            break;
          default:
            break;
        }
        keyPressInterval = 0;
      }
    };

    // eslint-disable-next-line
    let gamepadInterval = 0;
    let keyPressInterval = 0;

    addGamepad();
  };

  #touches = () => {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    this.$MAP.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
    });
    this.$MAP.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].pageX;
      endY = event.changedTouches[0].pageY;

      let x = endX - startX;
      let y = endY - startY;

      let absX = Math.abs(x) > Math.abs(y);
      let absY = Math.abs(y) > Math.abs(x);

      if (x > 0 && absX) {
        this.#move('Right');
      } else if (x < 0 && absX) {
        this.#move('Left');
      } else if (y > 0 && absY) {
        this.#move('Down');
      } else if (y < 0 && absY) {
        this.#move('Up');
      }
    });
  };

  #configurations = () => {
    this.MATRIX_WIDTH = 4;
    this.MATRIX_HEIGHT = 4;
  };

  #DOMs = () => {
    this.$MAP = document.querySelector('#map');
    this.$SCORE = document.querySelector('#score');
    this.$TIMER = document.querySelector('#timer');
    this.$DIALOG = document.querySelector('#dialog');
  };

  #eventListeners = () => {
    this.#keyboard();
    this.#gamepads();
    this.#touches();
  };
}

export default Game2048;
