/* --------- */
/* 2048 GAME */
/* --------- */

'use strict';

/* ------- */
/* SUPPORT */
/* ------- */

class Support {

    constructor() { };

    getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
};

/* -------------- */
/* CONFIGURATIONS */
/* -------------- */

class Configurations {

    constructor() {
        this.MAP_WIDTH = 4;
        this.MAP_HEIGHT = 4;

        this.MAP_WRAPPER = document.querySelector('.game-2048__map-wrapper');
        this.SCORE_WRAPPER = document.querySelector('.game-2048__score');
        this.TIMER_WRAPPER = document.querySelector('.game-2048__timer');
    };
};

/* ----- */
/* SCORE */
/* ----- */

class Score {

    constructor() {
        this.configurations = new Configurations();

        this.scoreWrapper = this.configurations.SCORE_WRAPPER;
        this.balance = 0;

        this.draw();
    };

    update = (n) => {
        this.balance = n;
        this.draw();
    };

    draw = () => {
        this.scoreWrapper.innerText = `Your Score: ${this.balance}`;
    };
};

/* ----- */
/* TIMER */
/* ----- */

class Timer {

    constructor() {
        this.configurations = new Configurations();

        this.timerWrapper = this.configurations.TIMER_WRAPPER;
        this.time = '00:00';

        this.timeStart = Date.now();
        this.timeNow = this.timeStart;

        this.draw();
    };

    draw() {
        this._calculate();
        this.timerWrapper.innerText = `Round Time: ${this.time}`;
    };

    _calculate() {
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

/* --- */
/* MAP */
/* --- */

class Map {

    constructor() {
        this.configurations = new Configurations();

        this.container = this.configurations.MAP_WRAPPER;
        this.width = this.configurations.MAP_WIDTH;
        this.height = this.configurations.MAP_HEIGHT;

        this.draw();
    };

    draw = () => {
        this.container.innerHTML = '';

        let map = document.createElement('div');
        map.classList.add('map');
        this.container.appendChild(map);

        for (let y = this.height - 1; y >= 0; y--) {
            for (let x = 0; x <= this.width - 1; x++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('x', x);
                cell.setAttribute('y', y);
                map.appendChild(cell);
            };
        };
    };
};

/* -------------- */
/* TILE FACTORIES */
/* -------------- */

class TileFactory {
    createTile = () => {
        return new Tile();
    };
};

/* ----- */
/* TILES */
/* ----- */


class Tile {

    constructor() {
        this.support = new Support();

        this.x = 0;
        this.y = 0;
        this.cost = 2;

        this.generate();
        this.draw();
    };

    generate = () => {
        let allCells = document.querySelectorAll('.cell');
        let emptyCell = [];

        allCells.forEach((item) => {
            if (!item.classList.contains('tile')) {
                emptyCell.push(item);
            };
        });

        let randomInteger = this.support.getRandomInteger(0, emptyCell.length);

        this.x = +emptyCell[randomInteger].getAttribute('x');
        this.y = +emptyCell[randomInteger].getAttribute('y');
    };

    draw = () => {
        document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add('tile', 'tile-' + this.cost);
        document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).innerText = this.cost;
    };
};

/* ---- */
/* GAME */
/* ---- */

class Game {

    constructor() {
        this._init();
        this._controls();
    };

    _init = () => {
        this.tiles = [[0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0]];

        this.map = new Map();
        this.score = new Score();
        this.timer = new Timer();

        this._addNewTile();

        this._countScore();
        this.interval = setInterval(this._draw, 1000);
    };

    _draw = () => {
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

    _countScore = () => {

        let totalScore = 0;

        for (let x = 0; x <= 3; x++) {
            for (let y = 0; y <= 3; y++) {
                if (this.tiles[x][y] !== 0) {
                    totalScore += this.tiles[x][y].cost;
                };
            };
        };

        this.score.update(totalScore);
    };

    _emptyCellsChecker = () => {
        let count = 0;
        for (let x = 0; x <= 3; x++) {
            for (let y = 0; y <= 3; y++) {
                if (this.tiles[x][y] === 0) {
                    count++;
                };
            };
        };
        return count;
    };

    _addNewTile = () => {
        if (this._emptyCellsChecker() === 0) {
            return;
        };

        this.factory = new TileFactory();
        let newTile = this.factory.createTile();
        this.tiles[newTile.x][newTile.y] = newTile;
    };

    _updateCoordinates = () => {
        for (let x = 0; x <= 3; x++) {
            for (let y = 0; y <= 3; y++) {
                if (this.tiles[x][y] !== 0) {
                    this.tiles[x][y].x = x;
                    this.tiles[x][y].y = y;
                };
            };
        };
    };

    _shrink = (line) => {

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

    _move = (direction) => {
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

            mutableLine = this._shrink(mutableLine);

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
        
        this._updateCoordinates();
        this._draw();

        if (countChanges > 0) {
            this._addNewTile();
        };

        this._draw();
        this._countScore();
    };

    _controls = () => {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                this._move('Up');
            } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this._move('Down');
            } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this._move('Left');
            } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this._move('Right');
            };
        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const GAME = new Game();

