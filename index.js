/* --------- */
/* 2048 GAME */
/* --------- */

'use strict';

class Support {
  constructor() {
    this.getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
  };
};

class Score {
  constructor(container) {
    this.$container = container;
    this.balance = 0;
    this.draw();
  };

  update = (n) => {
    this.balance = n;
    this.draw();
  };
  draw = () => {
    this.$container.innerText = `Your Score: ${this.balance}`;
  };
};

class Timer {
  constructor(container) {
    this.$container = container;
    this.time = '00:00';

    this.timeStart = Date.now();
    this.timeNow = this.timeStart;

    this.draw();
  };

  draw() {
    this.#calculate();
    this.$container.innerText = `Round Time: ${this.time}`;
  };
  #calculate() {
    this.timeNow = Date.now();
    let delta = this.timeNow - this.timeStart;

    let seconds = Math.floor(delta / 1000);
    let minutes = 0;

    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds - (minutes * 60);
    };

    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    this.time = `${minutes}:${seconds}`;
  };
};

class Tile {
  constructor(x, y, cost) {
    this.x = x;
    this.y = y;
    this.cost = cost;

    this.draw();
  };

  draw = () => {
    document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add('tile', 'tile-' + this.cost);
    document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).innerText = this.cost;
  };
};

class Map {
  constructor(container, width, height) {
    this.$container = container;
    this.matrix_width = width;
    this.matrix_height = height;

    this.matrix = this.generateMatrix(this.matrix_width, this.matrix_height);
    this.draw();
  };

  generateMatrix = (matrix_width, matrix_height) => {
    let matrix = new Array();
    for (let x = 0; x < matrix_width; x++) {
      matrix[x] = new Array();
      for (let y = 0; y < matrix_height; y++) {
        matrix[x][y] = 0;
      };
    };
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
      };
    };
  };
};

class Game {
  constructor() {
    this.#configurations();
    this.#DOMs();
    this.#eventListeners();

    this.support = new Support();

    this.init();
  };

  init = () => {
    this.map = new Map(this.$MAP_WRAPPER, this.MATRIX_WIDTH, this.MATRIX_HEIGHT);
    this.score = new Score(this.$SCORE_WRAPPER);
    this.timer = new Timer(this.$TIMER_WRAPPER);

    this.tiles = this.map.matrix;
    this.#addNewTile();
    this.#addNewTile();
    this.#countScore();

    this.$DIALOG_WRAPPER.innerHTML = 'Get 2048!';
    this.interval = setInterval(this.draw, 1000);
  };
  draw = () => {
    this.map.draw();
    this.score.draw();
    this.timer.draw();

    for (let x = 0; x <= 3; x++) {
      for (let y = 0; y <= 3; y++) {
        if (this.tiles[x][y] !== 0) {
          this.tiles[x][y].draw();
        };
      };
    };
  };

  #addNewTile = () => {
    if (this.#emptyCellsChecker() === 0) return;

    let emptyCells = new Array();

    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) {
          emptyCells.push([x, y]);
        };
      };
    };

    let random = this.support.getRandomInteger(0, emptyCells.length);
    let cost = 2 * this.support.getRandomInteger(1, 3);
    let x = emptyCells[random][0];
    let y = emptyCells[random][1];

    this.tiles[x][y] = new Tile(x, y, cost);
  };
  #emptyCellsChecker = () => {
    let count = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) count++;
      };
    };
    return count;
  };
  #countScore = () => {
    let totalScore = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] !== 0) {
          totalScore += this.tiles[x][y].cost;
        };
      };
    };
    this.score.update(totalScore);
  };
  #progressChecker = () => {
    let movements = 0;
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] === 0) {
          movements++;
        };
        if (y < 3) {
          if (this.tiles[x][y].cost === this.tiles[x][y + 1].cost) {
            movements++;
          };
        };
        if (x < 3) {
          if (this.tiles[x][y].cost === this.tiles[x + 1][y].cost) {
            movements++;
          };
        };
      };
    };
    if (movements === 0) {
      this.$DIALOG_WRAPPER.innerText = 'Game Over!';
      clearInterval(this.interval);
    };
  };
  #updateCoordinates = () => {
    for (let x = 0; x < this.MATRIX_WIDTH; x++) {
      for (let y = 0; y < this.MATRIX_HEIGHT; y++) {
        if (this.tiles[x][y] !== 0) {
          this.tiles[x][y].x = x;
          this.tiles[x][y].y = y;
        };
      };
    };
  };

  #shrink = (line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 0) {
        line.splice(i, 1);
        i--;
      };
    };
    if (line.length > 1) {
      line.forEach((item, index) => {
        if (line[index - 1] !== undefined) {
          if (item.cost === line[index - 1].cost) {
            line[index - 1].cost *= 2;
            line.splice(index, 1);
          };
        };
      });
    };
    for (let i = 1; i <= 4; i++) {
      if (line.length != 4) {
        line.push(0);
      };
    };
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
          };
          break;
        case 'Down':
          for (let y = 0; y <= 3; y++) {
            mutableLine.push(this.tiles[x][y]);
            originalLine.push(this.tiles[x][y]);
          };
          break;
        case 'Left':
          for (let y = 0; y <= 3; y++) {
            mutableLine.push(this.tiles[y][x]);
            originalLine.push(this.tiles[y][x]);
          };
          break;
        case 'Right':
          for (let y = 3; y >= 0; y--) {
            mutableLine.push(this.tiles[y][x]);
            originalLine.push(this.tiles[y][x]);
          };
          break;
      };

      mutableLine = this.#shrink(mutableLine);

      for (let i = 0; i <= mutableLine.length; i++) {
        if (mutableLine[i] !== originalLine[i]) {
          countChanges++;
        };
      };

      switch (direction) {
        case 'Up':
          for (let y = 3; y >= 0; y--) {
            this.tiles[x][y] = mutableLine.shift();
          };
          break;
        case 'Down':
          for (let y = 0; y <= 3; y++) {
            this.tiles[x][y] = mutableLine.shift();
          };
          break;
        case 'Left':
          for (let y = 0; y <= 3; y++) {
            this.tiles[y][x] = mutableLine.shift();
          };
          break;
        case 'Right':
          for (let y = 3; y >= 0; y--) {
            this.tiles[y][x] = mutableLine.shift();
          };
          break;
      };
    };

    this.#updateCoordinates();
    this.draw();

    if (countChanges > 0) {
      this.#addNewTile();
    };

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
      };
    });
  };
  #gamepads = () => {
    const checkGamepadSupport = () => {
      return 'getGamepads' in window.navigator;
    };
    const addGamepad = () => {
      if (!checkGamepadSupport()) {
        return;
      };
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
            };
          });
          if (!isPressed) {
            return;
          } else {
            gamepadHandler(button);
          };
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
        };
        keyPressInterval = 0;
      };
    };

    let gamepadInterval = 0;
    let keyPressInterval = 0;
    addGamepad();
  };
  #touches = () => {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    this.$MAP_WRAPPER.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
    });
    this.$MAP_WRAPPER.addEventListener('touchend', (event) => {
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
      };
    });
  };

  #configurations = () => {
    this.MATRIX_WIDTH = 4;
    this.MATRIX_HEIGHT = 4;
  };
  #DOMs = () => {
    this.$MAP_WRAPPER = document.querySelector('.game-2048__map-wrapper');
    this.$SCORE_WRAPPER = document.querySelector('.game-2048__score');
    this.$TIMER_WRAPPER = document.querySelector('.game-2048__timer');
    this.$DIALOG_WRAPPER = document.querySelector('.game-2048__dialog');
  };
  #eventListeners = () => {
    this.#keyboard();
    this.#gamepads();
    this.#touches();
  };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const GAME = new Game();

