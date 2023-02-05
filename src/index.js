'use strict';

import Game2048 from '@/2048.js';

const params = {
  speedRate: 200,
  keyRating: 'es:2048',
};

const game2048 = new Game2048(params);
game2048.start();
