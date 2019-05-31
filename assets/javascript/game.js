var word = ["annabelle","insidious","theconjuring",
"thering","thegrudge","thenun","theexorcist","paranormalactivity"];

var maxTries = 5;            

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var gameStarted = false;        
var gameFinished = false;          
var wins = 0;                   

//In the event of a key is pressed
document.onkeydown = function(event) {
    if(gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

// Reset game
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;
    guessedLetters = [];
    guessingWord = [];

    document.getElementById("start").style.cssText = "display: block";

    // Calculation to choose a random word in array
    currentWordIndex = Math.floor(Math.random() * (word.length));

    // Replace words with blank space
    for (var i = 0; i < word[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("winner").style.cssText = "display: none";
    
    // Show display
    updateDisplay();
};


function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Check if letter was not used
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    // Store positions of letters in string
    var positions = [];

    // Loop through word to find all instances of guessed letter, store the letter in an array.
    for (var i = 0; i < word[currentWordIndex].length; i++) {
        if(word[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};


//Stats
function updateDisplay() {
    document.getElementById("totalWins").textContent = wins;
    document.getElementById("currentWord").textContent = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").textContent += guessingWord[i];
    }
    document.getElementById("remainingGuesses").textContent = remainingGuesses;
    document.getElementById("guessedLetters").textContent = guessedLetters;


    if(remainingGuesses <= 0) {
        document.getElementById("gameover").style.cssText = "display: block";
        document.getElementById("start").style.cssText = "display: none";
        gameFinished = true;
    }
};
 
//If "_" is unidentified, we won
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winner").style.cssText = "display: block";
        document.getElementById("start").style.cssText = "display: none";
        wins++;
        gameFinished = true;
    }
};


