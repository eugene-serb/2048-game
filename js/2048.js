'use strict';

class Support {

    constructor() { };

    getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
};

class Configurations {

    constructor() {
        this.MAP_WIDTH = 4;
        this.MAP_HEIGHT = 4;

        this.MAP_WRAPPER = document.querySelector('.game-2048__map-wrapper');
    };
};

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

class TileFactory {
    createTile = () => {
        return new Tile();
    };
};

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
        this._addNewTile();
        console.log(this.tiles);
    };

    _draw = () => {
        this.map.draw();

        for (let x = 0; x <= 3; x++) {
            for (let y = 0; y <= 3; y++) {
                if (this.tiles[x][y] !== 0) {
                    this.tiles[x][y].draw();
                };
            };
        };
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
        line.forEach((item, index) => {
            if (index === 0 || item === 0) {
                return;
            };

            for (let i = index; i >= 0; i--) {
                if (line[i - 1] !== undefined) {
                    if (line[i - 1] === 0) {
                        line[i - 1] = item;
                        line[i] = 0;
                    } else if (line[i - 1].cost === line[i].cost) {
                        line[i - 1].cost *= 2;
                        line[i] = 0;
                        return;
                    };
                };
            };
        });
        return line;
    };

    _move = (direction) => {
        let countChanges = 0;

        /**/

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

        console.log(countChanges);
        
        this._updateCoordinates();

        if (countChanges !== 0) {
            this._addNewTile();
        };

        this._draw();
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

const GAME = new Game();

