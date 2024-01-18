let GameZone = document.querySelector(".gameZone");
let gameElements = document.querySelectorAll(".gameElement");
let emptyBlock = document.querySelector(".booferBlock");
let startButton = document.querySelector(".startTheGame");
let disabledStart = document.querySelector(".disabledStart");
let counter = document.querySelector(".counter");
let restart = document.querySelector(".restart");
let newHeight;
let spaceToAdd = gameElements[0].offsetWidth;
let arrayOfCoords = [];
let usedUndex = [];
let booferCoords = {bPosX:0, bPosY:0};
let booferElement;
let availableMoves = [];
let flagOfAvailable = false;
let counterValue = 0;


class positionNumber {
   constructor(value1, value2) {
      this.posX = value1;
      this.posY = value2
   }
}

function normalizeSize() {
   newHeight = GameZone.offsetWidth  + "px"
   GameZone.style.height = newHeight;
}

function createCoords() {
   let indexX = 0;
   let indexY = 0;

   for (let i = 1; i < 16; ++i) {
      let myElement = new positionNumber(indexX,indexY);
      arrayOfCoords.push(myElement);
   
      if(i % 4 === 0) {
         indexY += spaceToAdd;
         indexX = 0;
      }
      else
         indexX += spaceToAdd;
   }
}

function emptyAtStart() {
   emptyBlock.style.top = spaceToAdd * 3 + "px";
   emptyBlock.style.left = spaceToAdd * 3 + "px";
   emptyBlock.dataset.positionX = spaceToAdd * 3;
   emptyBlock.dataset.positionY = spaceToAdd * 3;
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}

function setRandomCoords() {

   let randomIndex;
   let choosenCoords;

   for (let i = 0; i < 15; ++i) {
      while (true) {
         randomIndex = getRandomInt(15);
         if(usedUndex.indexOf(randomIndex)=== -1)
            break;
      }

      usedUndex.push(randomIndex);
      choosenCoords = arrayOfCoords[randomIndex];
      gameElements[i].style.left = choosenCoords.posX + "px";
      gameElements[i].dataset.positionX = choosenCoords.posX;
      gameElements[i].style.top = choosenCoords.posY + "px";
      gameElements[i].dataset.positionY = choosenCoords.posY;
   }
}

function updateAvailableMoves() {
   let indexX = parseInt(emptyBlock.dataset.positionX);
   let indexY = parseInt(emptyBlock.dataset.positionY);
   availableMoves = [];

   availableMoves.push(new positionNumber(indexX - spaceToAdd, indexY));
   availableMoves.push(new positionNumber(indexX, indexY - spaceToAdd));
   availableMoves.push(new positionNumber(indexX + spaceToAdd, indexY));
   availableMoves.push(new positionNumber(indexX, indexY + spaceToAdd));
}

function choosenOne(e) {
   let choosenElement = document.getElementById(e.target.id)

   if (e.target != e.currentTarget && e.targer !== "special") {
      for (let i = 0; i < availableMoves.length; ++i) {
         if (availableMoves[i].posX == choosenElement.dataset.positionX && availableMoves[i].posY == choosenElement.dataset.positionY)  {
            flagOfAvailable = true;
            break;
         }
      }

      if (flagOfAvailable) {
         booferCoords.posX = emptyBlock.dataset.positionX;
         booferCoords.posY = emptyBlock.dataset.positionY;

         emptyBlock.style.left = choosenElement.dataset.positionX + "px";
         emptyBlock.style.top = choosenElement.dataset.positionY + "px";
         emptyBlock.dataset.positionX = choosenElement.dataset.positionX;
         emptyBlock.dataset.positionY = choosenElement.dataset.positionY;

         choosenElement.style.left = booferCoords.posX + "px";
         choosenElement.style.top = booferCoords.posY + "px";
         choosenElement.dataset.positionX = booferCoords.posX;
         choosenElement.dataset.positionY = booferCoords.posY;
         flagOfAvailable = false;
         updateAvailableMoves();
         ++counterValue;
         refrashCounter();
      }
   }
   e.stopPropagation();
}

GameZone.addEventListener("click", choosenOne, false)
startButton.addEventListener("click", startTheGame, false)
restart.addEventListener("click", reload, false)

function refrashCounter() {
   counter.textContent = counterValue;
}

function startTheGame(){
   emptyAtStart();
   updateAvailableMoves()
   createCoords();
   setRandomCoords();
   startButton.style.backgroundColor =  "gray";  
   startButton.style.border = "10px solid rgb(71, 71, 71)";
   startButton.removeEventListener("click", startTheGame, false);
}

function reload(){
   location.reload();
}

normalizeSize();


