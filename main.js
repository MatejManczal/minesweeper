var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var mainMenu = document.getElementById('menu');
var startElement = document.getElementById('start');
var helpElement = document.getElementById('help');
var creditsElement = document.getElementById('credits');
var previewElement = document.getElementById('preview');

var bomboSlider = document.getElementById('bomboSlider');
var velikostSlider = document.getElementById('velikostSlider');
var continueTextElement = document.getElementById('continueText');
var endBannerElement = document.getElementById('endBanner');

var deviceWidth = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
var startTime;
var velikost = 9;
var pocetBomb = 9;
var timeTextElement = document.getElementById('timeText');

window.onresize = function(){
  deviceWidth = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
  canvas.width = deviceWidth;
  canvas.height = deviceWidth;
  mainMenu.style = "width:" + (deviceWidth/2) + "px;height:" + deviceWidth + "px;left:" + (deviceWidth/4) + "px;";
  draw(renderTemplate(velikost));
}

preview.onclick = function(){
  previewGrid = new Game(velikost, pocetBomb);
  previewGrid.playArea = gridGen(1*previewGrid.size+1,previewGrid.size,previewGrid.dif);
  previewGrid.end();
}


velikostSlider.onchange = function(){
  bomboSlider.max = String(Math.floor((velikostSlider.value*velikostSlider.value)*0.5));
  velikost = Number(velikostSlider.value);

  if(pocetBomb > Number(bomboSlider.max)){
    bomboSlider.value=bomboSlider.max;
    pocetBomb = Number(bomboSlider.max);
  }

  draw(renderTemplate(velikost));
}

bomboSlider.onchange = function(){
  pocetBomb = Number(bomboSlider.value);
}

function Game(size, dif){
  this.markersLeft = dif;
  this.size = size;
  this.dif = dif;
  this.status = 0;
  this.drawArea = renderTemplate(size);
  this.playArea = [];

  this.move = function(x,y,shift){
    if (shift === true) {
      this.setMarker(y,x);
      klik.play();
    } else if (this.drawArea[y][x] === "tf") {
      this.drawArea[y][x] = "t";
      this.markersLeft++;
      fwup.play();
    } else if (this.playArea[y][x] === "tb") {
      bum.play();
      uncover(y, x);
      endBannerElement.style.backgroundColor = "rgba(255, 10, 40, 0.3)";
      endBannerElement.style.display = "initial";
      this.end();
      return;
    } else {
      uncover(y, x);
      klik.play();
      }
    draw(this.drawArea);
    winCond = 0;
    for (var i = 0; i < this.size; i++) {
      if (this.drawArea[i].indexOf("t") === -1) {
        winCond++;
      }
    }
    if (winCond === this.size && this.status === 1) {
      this.win();
    }
  }

  this.setMarker = function(y, x){
    if (this.drawArea[y][x] === "t") {
      if (this.markersLeft > 0) {
        this.drawArea[y][x] = "tf";
        this.markersLeft--;
        return;
      } else {
        alert("out of markers");
      }
    }
  }

  this.end = function() {
    this.drawArea = this.playArea;
    this.status = 2;
    draw(this.drawArea);
  }

  this.win = function() {
    victoryRoyale.play();
    this.status = 2;
    endBannerElement.style.backgroundColor = "rgba(17, 255, 40, 0.3)";
    endBannerElement.style.display = "initial";
    timeTextElement.innerHTML = "Finished in " + (new Date().getTime() - startTime) + "ms";
  }
}



endBannerElement.onclick = function(){
  endBannerElement.style.display = "none";
  mainMenu.style.display = "";
  mainMenu.style = "width:" + (deviceWidth/2) + "px;height:" + deviceWidth + "px;left:" + (deviceWidth/4) + "px;";
}

endBannerElement.style.width = deviceWidth+"px";
endBannerElement.style.height = deviceWidth+"px";
continueTextElement.style.marginTop = deviceWidth/6 + "px";

canvas.width = deviceWidth;
canvas.height = deviceWidth;
mainMenu.style = "width:" + (deviceWidth/2) + "px;height:" + deviceWidth + "px;left:" + (deviceWidth/4) + "px;";

window.onload = function(){
  draw(renderTemplate(velikost))
};



//start button handler
startElement.onclick = function(){
  draw(renderTemplate(velikost));
  start();
}

//help button handler
helpElement.onclick = function(){
  alert("Flags are placed with ctrl + lmb");
}

//credits button handler
// creditsElement.onclick = function(){
//   //credits();
// }


//textures
{
  var tile = new Image();
  tile.src = 'resources/tile.png';

  var tileDown = new Image();
  tileDown.src = 'resources/tileDown.png';

  var tileFlag = new Image();
  tileFlag.src = 'resources/tileFlag.png';

  var tileBomb = new Image();
  tileBomb.src = 'resources/tileBomb.png';

  var tileOne = new Image();
  tileOne.src = 'resources/tileOne.png';

  var tileTwo = new Image();
  tileTwo.src = 'resources/tileTwo.png';

  var tileThree = new Image();
  tileThree.src = 'resources/tileThree.png';

  var tileFour = new Image();
  tileFour.src = 'resources/tileFour.png';

  var tileFive = new Image();
  tileFive.src = 'resources/tileFive.png';

  var tileSix = new Image();
  tileSix.src = 'resources/tileSix.png';

  var tileSeven = new Image();
  tileSeven.src = 'resources/tileSeven.png';

  var tileEight = new Image();
  tileEight.src = 'resources/tileEight.png';

  var textures = {"t": tile, "td": tileDown, "tf": tileFlag, "tb": tileBomb, "t1": tileOne, "t2": tileTwo, "t3": tileThree, "t4": tileFour, "t5": tileFive, "t6": tileSix, "t7": tileSeven, "t8": tileEight};
}
//audio
{
  var klik = new Audio("resources/klik.wav");
  var bum = new Audio("resources/bum.wav");
  var fwup = new Audio("resources/fwup.mp3");
  var flop = new Audio("resources/flop.mp3");
  var victoryRoyale = new Audio("resources/victory-royale.mp3");
}

function start(){
  mainMenu.style = "display:none";
  currentGame = new Game(velikost, pocetBomb);
}



canvas.addEventListener('click', function(evt) {

  if (typeof currentGame !== 'undefined') {
    var rect = canvas.getBoundingClientRect();
    x = Math.floor((evt.clientX - rect.left)/(deviceWidth/currentGame.size));
    y = Math.floor((evt.clientY - rect.top)/(deviceWidth/currentGame.size));

    if (currentGame.status === 0) {
      startTime = new Date().getTime()
      currentGame.status = 1;
      currentGame.playArea = gridGen(y*currentGame.size+x,currentGame.size,currentGame.dif);
      currentGame.move(x,y,evt.shiftKey)

    } else if (currentGame.status !== 2) {
      console.log(evt);
      currentGame.move(x,y,evt.shiftKey || evt.altKey || evt.ctrlKey);
    }

  }


}, false);



function uncover(y, x){
  if (currentGame.playArea[y][x] === "td" && currentGame.drawArea[y][x] === "t") {
    currentGame.drawArea[y][x] = currentGame.playArea[y][x];

    [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]].forEach((offset, i) => {
      if (isInGrid(x+offset[0],y+offset[1])) {
        uncover(y+offset[1],x+offset[0]);
      }
    });
  } else {
    currentGame.drawArea[y][x] = currentGame.playArea[y][x];
  }
}

function isInGrid(x,y){
  if (x < 0 || y < 0 || x === currentGame.drawArea.length || y === currentGame.drawArea[0].length) {
    return false;
  } else {
    return true;
  }
}







//generates grid for initial render; returns 2d grid array
function renderTemplate(size){
  grid = [];
  for (var i = 0; i < size; i++) {
    grid.push(new Array(size).fill("t"));
  }
  return grid;
}

//generates grid for playing; returns 2d grid array
function gridGen(pos, size, dif){
  seed = "";

  //makes grid of empty tiles
  grid = [];
  for (var i = 0; i < size; i++) {
    grid.push(new Array(size).fill("td"));
  }

  //places dif bombs around the grid
  bombs = [];
  [0,-1,1,-1*size,-1*(size-1),-1*(size+1),size,size-1,size+1].forEach((item, i) => {
    bombs.push(pos+item);
  });


  for (var i = 0; i < dif; i++) {
    rngPos = rngBomb(bombs, size);
    bombs.push(rngPos);

    grid[Math.floor(rngPos/size)][rngPos%size] = "tb";
  }

  //makes tiles represent the value of number of touching bombs
  for (var i = 0; i < size*size; i++) {
    currentTile = [Math.floor(i/size),i%size];
    if (grid[currentTile[0]][currentTile[1]] === "tb") {
      continue;
    } else {
      tempVal = 0;
      for (var yOffset = -1; yOffset < 2; yOffset++) {
        for (var xOffset = -1; xOffset < 2; xOffset++) {

          if (currentTile[0]+yOffset < 0 ||  currentTile[1]+xOffset < 0 || currentTile[0]+yOffset > size-1 || currentTile[1]+xOffset > size-1) {
            continue;
          } else {
            if (grid[currentTile[0]+yOffset][currentTile[1]+xOffset] == "tb") {
              tempVal++;
            }
          }
        }
      }
      if (tempVal !== 0) {
        grid[currentTile[0]][currentTile[1]] = "t" + tempVal;
      }
    }
  }
  //marks down seed
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      seed += grid[i][j];
    }
  }
  return grid;
}

//finds viable positions for bombs; returns int position
function rngBomb(bombs, size){
  rngPos = Math.floor(Math.random()*(size*size));
  if (bombs.indexOf(rngPos) === -1) {
    return rngPos;
  } else {
    return rngBomb(bombs, size);
  }
}

//renders a given grid; returns undefined
function draw(toDraw){
  textureScale = deviceWidth/toDraw[0].length;
  toDraw.forEach((row, y) => {
    row.forEach((item, x) => {
      ctx.drawImage(textures[item],x*textureScale,y*textureScale,textureScale, textureScale);
    });
  });
}
