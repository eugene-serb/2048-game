'use strict';

module.exports = {
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "requireConfigFile": false,
  },
  "rules": {
    "no-unused-vars": "warn",
  },
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
  },
  "extends": [
    "eslint:recommended",
  ],
};
