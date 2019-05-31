var selectableWords = ["annabelle","insidious","theconjuring",
"thering","thegrudge","thenun","theexorcist","paranormalactivity"];

var maxTries = 5;            // Maximum number of tries player has

var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up


document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    document.getElementById("start").style.cssText = "display: block";

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("hangmanImage").style.cssText= "display: none";
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("winner").style.cssText = "display: none";
    document.getElementById("ghost2").style.cssText = "display: none";
    document.getElementById("ghost3").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function updateDisplay() {

    document.getElementById("totalWins").textContent = wins;
    document.getElementById("currentWord").textContent = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").textContent += guessingWord[i];
    }
    document.getElementById("remainingGuesses").textContent = remainingGuesses;
    document.getElementById("guessedLetters").textContent = guessedLetters;

    if(remainingGuesses = 3) {
        document.getElementById("ghost2").style.cssText = "display: block";
        document.getElementById("start").style.cssText = "display: none";
        hasFinished = false;
    }
    else if(remainingGuesses = 1) {
        document.getElementById("ghost1").style.cssText = "display: block";
        document.getElementById("ghost2").style.cssText = "display: none";
        hasFinished = false;
    }
    else if(remainingGuesses <= 0) {
        document.getElementById("gameover").style.cssText = "display: block";
        document.getElementById("start").style.cssText = "display: none";
        hasFinished = true;
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winner").style.cssText = "display: block";
        document.getElementById("start").style.cssText = "display: none";
        wins++;
        hasFinished = true;
    }
};

function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "../images/ghost1" + (maxTries - remainingGuesses) + ".png";
};

