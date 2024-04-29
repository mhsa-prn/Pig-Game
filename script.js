'use strict';

//define elements---------------------------------------------------------
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const imgDice = document.querySelector('.dice');

const secPlayer0 = document.querySelector('.player--0');
const secplayer1 = document.querySelector('.player--1');

const scoreCurrentPlayer0 = document.querySelector('#current--0');
const scoreTotalPlayer0 = document.querySelector('#score--0');

const scoreCurrentPlayer1 = document.querySelector('#current--1');
const scoreTotalPlayer1 = document.querySelector('#score--1');
//end define elements----------------------------------------------------

//define functions-------------------------------------------------

//player 0 is active or not
function ifPlayer0IsActive() {
    return secPlayer0.classList.contains('player--active');
}

//change player
function changePlayer(flag) {
    if (flag === true) {
        secPlayer0.classList.remove('player--active');
        secplayer1.classList.add('player--active');
        scoreCurrentPlayer0.textContent = '0';
    } else {
        secplayer1.classList.remove('player--active');
        secPlayer0.classList.add('player--active');
        scoreCurrentPlayer1.textContent = '0';
    }
}

//roll dice
function rollDice() {
    btnHold.disabled = false;
    let rndDiceNumber = Math.trunc(Math.random() * 6) + 1;
    imgDice.src = `dice-${rndDiceNumber}.png`;
    if (rndDiceNumber === 1) {
        changePlayer(ifPlayer0IsActive());
    } else {
        if (ifPlayer0IsActive()) {
            scoreCurrentPlayer0.textContent =
                Number(scoreCurrentPlayer0.textContent) + rndDiceNumber;
        } else {
            scoreCurrentPlayer1.textContent =
                Number(scoreCurrentPlayer1.textContent) + rndDiceNumber;
        }
    }
}

//hold score
function holdScore(eventDetail) {
    if (ifPlayer0IsActive()) {
        if (Number(scoreCurrentPlayer0.textContent) !== 0) {
            scoreTotalPlayer0.textContent =
                Number(scoreTotalPlayer0.textContent) +
                Number(scoreCurrentPlayer0.textContent);
            checkAHundredScore(true, Number(scoreTotalPlayer0.textContent));
            changePlayer(ifPlayer0IsActive());
        } else {
            btnHold.disabled = true;
        }
    } else {
        if (Number(scoreCurrentPlayer1.textContent) !== 0) {
            scoreTotalPlayer1.textContent =
                Number(scoreTotalPlayer1.textContent) +
                Number(scoreCurrentPlayer1.textContent);
            checkAHundredScore(false, Number(scoreTotalPlayer0.textContent));
            changePlayer(ifPlayer0IsActive());
        } else {
            btnHold.disabled = true;
        }
    }
}

//start new game
function newGame() {
    secplayer1.classList.remove('player--active');
    scoreCurrentPlayer0.textContent = '0';
    scoreTotalPlayer0.textContent = '0';
    scoreCurrentPlayer1.textContent = '0';
    scoreTotalPlayer1.textContent = '0';
    imgDice.src = 'dice-6.png';
}

//check 100 rule
function checkAHundredScore(flag, score) {
    if (score >= 100) {
        if (flag) alert('Player 0 won!');
        else alert('Player 1 won!');
        newGame();
    }
}

//end define functions---------------------------------------------------

//event listeners--------------------------------------------------------
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', function (e) {
    holdScore(e);
});

btnNewGame.addEventListener('click', newGame);
//end event listeners----------------------------------------------------
