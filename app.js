//Dom selectors

//This is for the button that starts the game
const startGameButton = document.querySelector('.btn__reset');
// this is for the on screen keyboard
const qwerty = document.querySelector('#qwerty');
//this is for the phrase that the game will use
const phrase = document.querySelector('#phrase');
//this is for the screen overlay
const overlay = document.querySelector('#overlay');

// variable for the wrong guesses
let missedGuesses = 0;

// array for the stored phrases that the game uses
const phrases = [
    'leicester',
    'everton',
    'liverpool',
    'arsenal',
    'chelsea'
];

//start game event listener
startGameButton.addEventListener('click', () => {
    if (startGameButton.className === 'btn__reset reset') {
      window.location.reload();
    }
    startGameButton.parentElement.style.display = 'none';
    reset_button();
})

//reset button for when the game is finished
reset_button = () => {
  startGameButton.textContent = "Try Again";
  startGameButton.className += " reset"
}

// the event listener for the onscreen keyboard
qwerty.addEventListener("click", (event) => {
  let clickedButton = event.target;
  if (clickedButton.tagName === "BUTTON") {
    clickedButton.className += " chosen";
    let match = checkLetter(clickedButton);
    clickedButton.disabled = true;
    if (match === null) {
      missedGuesses++;
      let heart = document.querySelector('#scoreboard ol').firstElementChild;
      heart.remove();
    }
  }
  checkWin();
});

// this picks the phrase from the array at the top of the app.js
getRandomPhraseAsArray = (arr) => {
  let randomPhrase = [];
  let randomNumber = Math.floor(Math.random() * arr.length);
  randomPhrase = phrases[randomNumber];
  randomPhrase = randomPhrase.split("");
  return randomPhrase;
}


addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let ul = phrase.firstElementChild;
    let li = document.createElement("li");
    li.textContent = arr[i];
    if (arr[i] !== " ") {
        li.className = "letter";
    } else {
        li.className = "space";
    }
    ul.appendChild(li);
  }
};

//this checks the letter to the chosen phrase from the array
checkLetter = (buttonTarget) => {
    let checkLetter = document.querySelectorAll('#phrase li');
    let match = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if (buttonTarget.textContent === checkLetter[i].textContent) {
            checkLetter[i].className += " show";
            match = checkLetter[i].textContent;
        }
    }
    return match;
}

//this checks to see if you have won or lost the game
checkWin = () => {
  let letters = document.getElementsByClassName('letter');
  let shown = document.getElementsByClassName('show');
  if (letters.length === shown.length) {
    overlay.className += ' win';
    overlay.firstElementChild.textContent = "WINNER!!!"
    overlay.style.display = 'flex';
  } else if (missedGuesses > 4) {
    overlay.className += ' lose';
    overlay.firstElementChild.textContent = "Better luck next time!"
    overlay.style.display = 'flex';
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


