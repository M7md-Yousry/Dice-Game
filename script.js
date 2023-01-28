'use strict';

// Selecting Elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
let playing, scores, currentScore, activePlayer;
//Switch Player
const swithcPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
// Selecting btns elements
const newbtn = document.querySelector('.btn--new');
const holdbtn = document.querySelector('.btn--hold');
const rollbtn = document.querySelector('.btn--roll');
// selecting current score elements
const current1El = document.querySelector('#current--0');
const current2El = document.querySelector('#current--1');

// initialize values
const init = function () {
  scores = [0, 0];
  // Assigning Score to 0
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  // define current score
  current1El.textContent = 0;
  current2El.textContent = 0;
  // Create Hidden class in css and add it to dice element
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();
// For defining active players
// Rolling dice functionality
rollbtn.addEventListener('click', function () {
  if (playing) {
    // Gnerating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check for rolled 1:
    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      // current1El.textContent = currentScore;
    } else {
      //if true, siwtch to next player
      swithcPlayer();
    }
  }
});

holdbtn.addEventListener('click', function () {
  if (playing) {
    // Hold assign value to score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Win if score >= 20
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('palyer--active');
    } else {
      // Switch player
      swithcPlayer();
    }
  }
});

newbtn.addEventListener('click', init);
