(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}function n(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var r=new WeakSet;function o(){this.interval=null,this.isGameOver=!1,this.isPaused=!1,this.canMove=!0}const i=function(){function t(){var e,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e=this,i=r),i.add(e),n(this,r,o).call(this)}var i,a;return i=t,(a=[{key:"start",value:function(){this.isGameOver&&this.clear(),this.isPaused=!1,this.canMove=!0}},{key:"stop",value:function(){this.isPaused=!0,this.canMove=!1,clearTimeout(this.interval)}},{key:"setGameOver",value:function(){this.isGameOver=!0,this.stop()}},{key:"clear",value:function(){this.stop(),n(this,r,o).call(this)}}])&&e(i.prototype,a),Object.defineProperty(i,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,u(r.key),r)}}function c(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function l(t,e,n){return(e=u(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t){var e=function(t,e){if("object"!==a(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===a(e)?e:String(e)}const f=c((function t(e,n,r){var o=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,"generateMatrix",(function(t,e){for(var n=new Array,r=0;r<t;r++){n[r]=new Array;for(var o=0;o<e;o++)n[r][o]=0}return n})),l(this,"draw",(function(){o.$container.innerHTML="";var t=document.createElement("div");t.classList.add("map"),o.$container.appendChild(t);for(var e=o.matrix_height-1;e>=0;e--)for(var n=0;n<o.matrix_width;n++){var r=document.createElement("div");r.classList.add("cell"),r.setAttribute("x",n),r.setAttribute("y",e),t.appendChild(r)}})),this.$container=e,this.matrix_width=n,this.matrix_height=r,this.matrix=this.generateMatrix(this.matrix_width,this.matrix_height),this.draw()}));function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==h(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==h(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===h(o)?o:String(o)),r)}var o}const p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._value=e&&"number"==typeof e?e:0}var e,n;return e=t,(n=[{key:"value",get:function(){return this._value},set:function(t){t&&"number"==typeof t&&(this._value=t)}},{key:"increase",value:function(t){this._value+=t&&"number"==typeof t?t:1}},{key:"decrease",value:function(t){this._value-=t&&"number"==typeof t?t:1}},{key:"reset",value:function(){this._value=0}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==v(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==v(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===v(o)?o:String(o)),r)}var o}function b(t,e){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.add(t)}function w(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var d=new WeakSet,S=new WeakSet;function T(){this._timeStart=Date.now(),this._timeNow=this._timeStart,this._value="00:00"}function g(){this._timeNow=Date.now();var t=this._timeNow-this._timeStart,e=Math.floor(t/1e3),n=0;e>=60&&(e-=60*(n=Math.floor(e/60))),n=n<10?"0".concat(n):"".concat(n),e=e<10?"0".concat(e):"".concat(e),this._value="".concat(n,":").concat(e)}const _=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),b(this,S),b(this,d),w(this,d,T).call(this)}var e,n;return e=t,(n=[{key:"value",get:function(){return w(this,S,g).call(this),this._value}},{key:"reset",value:function(){w(this,d,T).call(this)}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==E(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===E(o)?o:String(o)),r)}var o}const P=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=e,this.y=n,this.cost=r,this.draw()}var e,n;return e=t,(n=[{key:"draw",value:function(){document.querySelector('[x = "'.concat(this.x,'"][y = "').concat(this.y,'"]')).classList.add("tile","tile-"+this.cost),document.querySelector('[x = "'.concat(this.x,'"][y = "').concat(this.y,'"]')).innerText=this.cost}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==j(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===j(o)?o:String(o)),r)}var o}function O(t,e,n){return e&&R(t.prototype,e),n&&R(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var x=new WeakSet;function I(){var t=this;window.addEventListener("keydown",(function(e){t._context.isGameOver||("ArrowLeft"===e.code||"KeyA"===e.code?t._context.moveToLeft():"ArrowUp"===e.code||"KeyW"===e.code?t._context.moveToUp():"ArrowRight"===e.code||"KeyD"===e.code?t._context.moveToRight():"ArrowDown"!==e.code&&"KeyS"!==e.code||t._context.moveToDown()),"KeyR"===e.code&&(t._context.clear(),t._context.start()),"KeyP"===e.code&&(t._context.isGameOver||(t._context.isPaused?t._context.start():t._context.stop()))}))}const A=O((function t(e){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(n=this,r=x),r.add(n),this._context=e,function(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}(this,x,I).call(this)}));function M(t){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function W(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==M(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==M(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===M(o)?o:String(o)),r)}var o}function D(t,e,n){return e&&W(t.prototype,e),n&&W(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function H(t,e){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.add(t)}function L(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var G=new WeakSet,X=new WeakSet,U=new WeakSet,$=new WeakSet;function N(){L(this,$,z).call(this)&&(this.LISTENER_INTERRUPT=10,this.KEYPRESS_INTERRUPT=250,this._gamepadInterval=null,this._keypressCooldown=0,L(this,X,K).call(this))}function K(){var t=this;window.addEventListener("gamepadconnected",(function(){t._gamepadInterval=setInterval((function(){t._keypressCooldown+=t.LISTENER_INTERRUPT;var e,n,r=(e=navigator.getGamepads(),n=1,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,s=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(s.push(r.value),s.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return s}}(e,n)||function(t,e){if(t){if("string"==typeof t)return C(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0],o=!1,i=null;r.buttons.forEach((function(t,e){1===t.value&&(i=e,o=!0)})),o&&L(t,U,q).call(t,i)}),t.LISTENER_INTERRUPT)}))}function q(t){this._keypressCooldown>=this.KEYPRESS_INTERRUPT&&(12===t&&(this._context.moveToUp(),this._keypressCooldown=0),13===t&&(this._context.moveToDown(),this._keypressCooldown=0),14===t&&(this._context.moveToLeft(),this._keypressCooldown=0),15===t&&(this._context.moveToRight(),this._keypressCooldown=0),8===t&&(this._context.isPaused?(this._context.start(),this._keypressCooldown=0):(this._context.stop(),this._keypressCooldown=0)),9===t&&(this._context.clear(),this._context.start(),this._keypressCooldown=0))}function z(){return"getGamepads"in window.navigator}const Y=D((function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),H(this,$),H(this,U),H(this,X),H(this,G),this._context=e,L(this,G,N).call(this)}));function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==B(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==B(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===B(o)?o:String(o)),r)}var o}function J(t,e,n){return e&&F(t.prototype,e),n&&F(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var Q=new WeakSet;function V(){var t=this,e=0,n=0;this._container.addEventListener("touchstart",(function(t){e=t.touches[0].pageX,n=t.touches[0].pageY})),this._container.addEventListener("touchend",(function(r){var o=r.changedTouches[0].pageX,i=r.changedTouches[0].pageY,a=o-e,s=i-n,c=Math.abs(a)>Math.abs(s),l=Math.abs(s)>Math.abs(a);a>0&&c?t._context.moveToRight():a<0&&c?t._context.moveToLeft():s>0&&l?t._context.moveToDown():s<0&&l&&t._context.moveToUp()}))}const Z=J((function t(e,n){var r,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(r=this,o=Q),o.add(r),this._context=e,this._container=n,function(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}(this,Q,V).call(this)}));function tt(t,e){var n=t&&"number"==typeof t?t:0,r=e&&"number"==typeof e?e:0;return Math.floor(Math.random()*(r-n)+n)}function et(t){return et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(t)}function nt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==et(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==et(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===et(o)?o:String(o)),r)}var o}function rt(){return rt="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=at(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},rt.apply(this,arguments)}function ot(t,e){return ot=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},ot(t,e)}function it(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function at(t){return at=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},at(t)}function st(t,e){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.add(t)}function ct(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var lt=new WeakSet,ut=new WeakSet,ft=new WeakSet,ht=new WeakSet,yt=new WeakSet,pt=new WeakSet,vt=new WeakSet,mt=new WeakSet,bt=new WeakSet,wt=new WeakSet,dt=new WeakSet,St=new WeakSet,Tt=new WeakSet;function gt(){this.$DIALOG.innerHTML="Get 2048!",this.timer=new _,this.score=new p,this.drawer=new f(this.$MAP,this.MATRIX_WIDTH,this.MATRIX_HEIGHT),this.tiles=this.drawer.matrix,ct(this,ht,kt).call(this),ct(this,ht,kt).call(this),ct(this,pt,jt).call(this),ct(this,ft,Et).call(this)}function _t(){ct(this,ft,Et).call(this)}function Et(){this.drawer.draw();for(var t=0;t<=3;t++)for(var e=0;e<=3;e++)0!==this.tiles[t][e]&&this.tiles[t][e].draw();this.$SCORE.innerText="Score: ".concat(this.score.value),this.$TIMER.innerText="Time: ".concat(this.timer.value)}function kt(){if(0!==ct(this,yt,Pt).call(this)){for(var t=new Array,e=0;e<this.MATRIX_WIDTH;e++)for(var n=0;n<this.MATRIX_HEIGHT;n++)0===this.tiles[e][n]&&t.push([e,n]);var r=tt(0,t.length),o=2*tt(1,3),i=t[r][0],a=t[r][1];this.tiles[i][a]=new P(i,a,o)}}function Pt(){for(var t=0,e=0;e<this.MATRIX_WIDTH;e++)for(var n=0;n<this.MATRIX_HEIGHT;n++)0===this.tiles[e][n]&&t++;return t}function jt(){for(var t=0,e=0;e<this.MATRIX_WIDTH;e++)for(var n=0;n<this.MATRIX_HEIGHT;n++)0!==this.tiles[e][n]&&(t+=this.tiles[e][n].cost);this.score.value=t}function Rt(){for(var t=0,e=0;e<this.MATRIX_WIDTH;e++)for(var n=0;n<this.MATRIX_HEIGHT;n++)0===this.tiles[e][n]&&t++,n<3&&this.tiles[e][n].cost===this.tiles[e][n+1].cost&&t++,e<3&&this.tiles[e][n].cost===this.tiles[e+1][n].cost&&t++;0===t&&(this.$DIALOG.innerText="Game Over!",clearInterval(this.interval))}function Ot(){for(var t=0;t<this.MATRIX_WIDTH;t++)for(var e=0;e<this.MATRIX_HEIGHT;e++)0!==this.tiles[t][e]&&(this.tiles[t][e].x=t,this.tiles[t][e].y=e)}function xt(t){for(var e=0;e<t.length;e++)0===t[e]&&(t.splice(e,1),e--);t.length>1&&t.forEach((function(e,n){void 0!==t[n-1]&&e.cost===t[n-1].cost&&(t[n-1].cost*=2,t.splice(n,1))}));for(var n=1;n<=4;n++)4!=t.length&&t.push(0);return t}function It(t){for(var e=0,n=0;n<=3;n++){var r=[],o=[];switch(t){case"Up":for(var i=3;i>=0;i--)r.push(this.tiles[n][i]),o.push(this.tiles[n][i]);break;case"Down":for(var a=0;a<=3;a++)r.push(this.tiles[n][a]),o.push(this.tiles[n][a]);break;case"Left":for(var s=0;s<=3;s++)r.push(this.tiles[s][n]),o.push(this.tiles[s][n]);break;case"Right":for(var c=3;c>=0;c--)r.push(this.tiles[c][n]),o.push(this.tiles[c][n])}r=ct(this,bt,xt).call(this,r);for(var l=0;l<=r.length;l++)r[l]!==o[l]&&e++;switch(t){case"Up":for(var u=3;u>=0;u--)this.tiles[n][u]=r.shift();break;case"Down":for(var f=0;f<=3;f++)this.tiles[n][f]=r.shift();break;case"Left":for(var h=0;h<=3;h++)this.tiles[h][n]=r.shift();break;case"Right":for(var y=3;y>=0;y--)this.tiles[y][n]=r.shift()}}ct(this,mt,Ot).call(this),ct(this,ft,Et).call(this),e>0&&ct(this,ht,kt).call(this),ct(this,ft,Et).call(this),ct(this,pt,jt).call(this),ct(this,vt,Rt).call(this)}function At(){this.MATRIX_WIDTH=4,this.MATRIX_HEIGHT=4}function Mt(){this.$MAP=document.querySelector("#map"),this.$SCORE=document.querySelector("#score"),this.$TIMER=document.querySelector("#timer"),this.$DIALOG=document.querySelector("#dialog")}function Ct(){this._keyboard=new A(this),this._gamepads=new Y(this),this._touchscreen=new Z(this,this.$MAP)}new(function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ot(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=at(r);if(o){var n=at(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===et(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return it(t)}(this,t)});function a(){var t,e,n,r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),st(it(r=i.call(this)),Tt),st(it(r),St),st(it(r),dt),st(it(r),wt),st(it(r),bt),st(it(r),mt),st(it(r),vt),st(it(r),pt),st(it(r),yt),st(it(r),ht),st(it(r),ft),st(it(r),ut),st(it(r),lt),r.SPEED_RATE=null!==(t=r._params)&&void 0!==t&&t.speedRate&&"number"==typeof(null===(e=r._params)||void 0===e?void 0:e.speedRate)?null===(n=r._params)||void 0===n?void 0:n.speedRate:1e3,ct(it(r),St,Mt).call(it(r)),ct(it(r),dt,At).call(it(r)),ct(it(r),Tt,Ct).call(it(r)),ct(it(r),lt,gt).call(it(r)),r}return e=a,(n=[{key:"moveToLeft",value:function(){ct(this,wt,It).call(this,"Left")}},{key:"moveToUp",value:function(){ct(this,wt,It).call(this,"Up")}},{key:"moveToRight",value:function(){ct(this,wt,It).call(this,"Right")}},{key:"moveToDown",value:function(){ct(this,wt,It).call(this,"Down")}},{key:"start",value:function(){rt(at(a.prototype),"start",this).call(this),this.interval=setInterval(ct(this,ut,_t).bind(this),this.SPEED_RATE)}},{key:"clear",value:function(){rt(at(a.prototype),"clear",this).call(this),ct(this,lt,gt).call(this)}}])&&nt(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(i))({speedRate:200}).start()})();