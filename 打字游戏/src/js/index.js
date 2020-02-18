var config = {
  oGame : document.getElementsByClassName('game')[0],
  LetterArr : [],
  oSquare : document.getElementsByClassName('square')[0],
  oMask : document.getElementsByClassName('mask')[0],
  oTime : document.getElementsByClassName('time')[0],
  timer : null,
  productionTimer: null,
  // 产生对象间隔时间
  time:1000,
  score:0,
  countDown : 10
}
config.minLeft =  config.oSquare.offsetLeft ;
config.maxLeft =  config.oSquare.clientWidth - 100;
config.maxTop =   config.oSquare.clientHeight - 100;






/**
 * 字母对象
 */
function Letter () {
  this.left = random(config.minLeft,config.maxLeft);  // left 随机
  this.letter = getRndomLetter();                     // 字母随机
  this.top = 100;                                    // top固定为-100；
  this.speed = random((50 + config.score / 7),(100 + config.score / 7));                        // 初始速度随机 每秒下落距离
  this.render();
  this.position()
}


/**渲染字母元素，设置left */
Letter.prototype.render = function () {
  var oImg = document.createElement('img');
  console.log(this.letter)
  oImg.src = `./src/img/letter/${this.letter}.png`;
  config.oSquare.appendChild(oImg);
  this.dom = oImg;
  this.dom.style.left = this.left + 'px';
}


/**设置top */
Letter.prototype.position = function () {
  this.dom.style.top = this.top + 'px';
}


/**下落 */
Letter.prototype.move = function (time) {
  var dir = this.speed * time / 1000;
  this.top += dir;
  this.position();
}


/**
 * 超出范围或者点击后消失
 */
Letter.prototype.kill = function () {
  config.oSquare.removeChild(this.dom);
  config.LetterArr.splice(config.LetterArr.indexOf(this),1);
}

/**
 * 产生字母对象
 */

function productionLetter () {
  var timer = config.productionTimer
  if (timer) {
    clearInterval(timer);
    return ;
  }
  config.productionTimer = setInterval(function () {
    var O = new Letter();
    config.LetterArr.push(O);
  },config.time)
}

/**
 * 实时运动并且监控是否在可视范围内
 * moveTimer
 */
var moveTimer = null;
function moveAndTop () {
  clearInterval(moveTimer)
  moveTimer = setInterval( function () {
    for (var i = 0; i < config.LetterArr.length; i++) {
      config.LetterArr[i].move(16);
      if (config.LetterArr[i].dom.offsetTop >= config.maxTop) {
        config.LetterArr[i].kill();
        i--;
      }
    }
  }, 16)
}

/**游戏计时器 */
var gameTimer = null;
function gameStart () {
  gameTimer = setInterval(function () {
    config.countDown --
    config.oTime.innerText = config.countDown;
    if (config.countDown === 0) {
      gameOver();
    }
  }, 1000)
}

/**
 * 
 * 键盘事件 
 */
window.onkeypress = function (e) {
  var letter = String.fromCharCode(e.keyCode);
  for (var i = 0; i < config.LetterArr.length; i++) {
    if (letter.toLocaleUpperCase() === config.LetterArr[i].letter) {
      config.score += 10;
      config.LetterArr[i].kill();
      i--;
    }
  }
}

/**
 * 游戏结束
 */
function gameOver() {
  clearInterval(config.productionTimer);
  clearInterval(moveTimer);
  clearInterval(gameTimer);
  window.onkeypress = null;
  config.oMask.style.display = 'block';
  setTimeout(function () {
    alert(config.score);
  } , 100) 
}





/**
 * 产生一个随机数给定范围内的随机数
 * @param {*} min 
 * @param {*} max 
 */
function random (min, max) {
  return Math.floor( Math.random() * (max - min) + min );
}
/**
 * 产生随机字母
 */
function getRndomLetter () {
  var charCode = random(65,91);
  // 通过字符串方法将编码变为字符
  var letter = String.fromCharCode(charCode)
  return letter ;
}



/**r入口 */
function init () {
  config.oTime.innerText = config.countDown;
  gameStart();
  productionLetter();
  moveAndTop();
}
init();







