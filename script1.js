"use strict";

// Selecting html elements using queryselector and storing them in variables
const leftElem = document.querySelector(`.left`);
const rightElem = document.querySelector(`.right`);
const highScoreElem = document.querySelector(`#highscore`);
const totalScoreElem = document.querySelector(`#score`);
const curScoreElem = document.querySelector(`#current`);
const diceRollsElem = document.querySelector(`#dicerolls`);
const diceImgElem = document.querySelector(`.dice`);
const btnNewGameElem = document.querySelector(`.btn-new`);
const btnRollDiceElem = document.querySelector(`.btn-roll`);
const btnHoldElem = document.querySelector(`.btn-hold`);
const bodyElem = document.querySelector(`body`);
const mainElem = document.querySelector(`main`);
const gameElem = document.querySelector(`.game`);
let curscore, score, gameState, dicerolls;

let highScore = Infinity;

// Starting game setup
function setup() {
  curscore = 0;
  dicerolls = 0;
  score = 0;
  // to stop the game when finished we need a variable to track the gamestate
  // setting the game state to true to start the gamee
  gameState = true;
  console.log(highScore);

  highScoreElem.textContent = highScore == Infinity ? 0 : highScore;
  totalScoreElem.textContent = score;
  curScoreElem.textContent = curscore;
  diceRollsElem.textContent = dicerolls;
  diceImgElem.classList.add(`hidden`);
  leftElem.classList.remove(`game-winner`);
  rightElem.classList.remove(`game-winner`);
  btnRollDiceElem.style.backgroundColor = "#fff";
  btnRollDiceElem.style.color = "#444";
}
// setup();

function scoreZero() {
  curscore = 0;
  curScoreElem.textContent = curscore;
}
// Rolling dice functionality
function rolldice() {
  // checking if game is being played
  if (gameState) {
    // Generating a random dice roll
    let diceval = Math.trunc(Math.random() * 6 + 1);

    // Display dice by removing the hidden class
    diceImgElem.classList.remove(`hidden`);
    diceImgElem.src = `dice-${diceval}.png`;
    //Check if the diceval is 1
    if (diceval != 1) {
      // Add diceval to current score
      curscore += diceval;
      curScoreElem.textContent = curscore;
    } else {
      // make current score 0
      scoreZero();
    }

    dicerolls++;
    diceRollsElem.textContent = `${dicerolls}`;
  }
}
function holdscore() {
  if (gameState) {
    // Add current score to total score
    score += curscore;
    curscore = 0;
    curScoreElem.textContent = curscore;
    totalScoreElem.textContent = score;

    // Check if player's score is >= 50
    if (score >= 50) {
      // End the game by setting gamestate to false
      gameState = false;
      highScore = Math.min(highScore, dicerolls);
      highScoreElem.textContent = highScore;
      gameElem.classList.add("game-winner");
      gameElem.classList.remove("left");
      gameElem.classList.remove("right");
      diceImgElem.classList.add(`hidden`);
      btnRollDiceElem.style.backgroundColor = "red";
      btnRollDiceElem.style.color = "#ffffff";
    }
  }
}
function changebg() {
  bodyElem.style.backgroundColor = `#000000`;
}

function revertbg() {
  bodyElem.style.backgroundColor = `#ffffff`;
}

btnNewGameElem.addEventListener("click", setup);
btnRollDiceElem.addEventListener("click", rolldice);
btnHoldElem.addEventListener("click", holdscore);
mainElem.addEventListener("mouseover", changebg);
mainElem.addEventListener("mouseout", revertbg);
