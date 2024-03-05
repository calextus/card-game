const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `img${arr[i]}.jpg`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
//the score 
// Add JavaScript code for scoreboard and timer
// Get the scoreboard and timer elements
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Set initial values
let score = 0;
let time = 0;

// Update the scoreboard display
function updateScore(newScore) {
  score = newScore;
  scoreElement.textContent = score;
}

// Update the timer display
  // Function to start the game and timer
  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      timerInterval = setInterval(updateTimer, 1000); // Start the timer
      shuffleCard();
    }
  }


function updateTimer() {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    if (matched === 8) {
      clearInterval(timerInterval); // Stop the timer when all cards are matched
    }
  }

// Call updateTimer every second
setInterval(updateTimer, 1000);

// You can add more functionality for the game logic here


//score recorded

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        updateScore(matched); // Update score when cards match

        if (matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
// buttons 
// Add JavaScript code for scoreboard, timer, and buttons
const startButton = document.getElementById('startButton');
const refreshButton = document.getElementById('refreshButton');

let timerInterval;
let gameStarted = false;

// Function to start the game
function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    timerInterval = setInterval(updateTimer, 1000);
    shuffleCard();
  }
}

// Function to restart the game
function restartGame() {
  clearInterval(timerInterval);
  time = 0;
  updateTimer();
  matched = 0;
  updateScore(matched);
  gameStarted = false;
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
    card.classList.remove("flip");
  });
}

// Event listeners for buttons
startButton.addEventListener('click', startGame);
refreshButton.addEventListener('click', restartGame);
