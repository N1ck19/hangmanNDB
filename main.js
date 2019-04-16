// GLOBAL VARIABLE (accessible by all functions)
//-----------------------------------------------------------

//Array of Word Options (all lowercase)
var wordsList = ["gorillaz", "daft punk", "mr oizo", "justice", "home", "pogo", "sebastian", "thelivingtombstone"];

// Solution held here
var chosenWord = "";

// This will break the solution into individual letters to be stored in an array
var lettersInChosenWord = [];

// The number of blanks based on the solution.
var numBlanks = 0;

// Holds a mix of blank and solved letters (ex: a_ple (word is apple))
var blanksAndSuccesses = [];

// Holds all of the wrong guesses
var wrongGuesses = [];

// Game Counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;


// FUNCTIONS
// --------------------------------------------

// Note: the startGame() function is not being run here. It is just being made for future use.

function startGame() {

	
	// Resets the guesses back to specified amount.
	numGuesses = 9;

	// Solution is chosen randomly from wordsList
	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

	// The word is broken into individual letters
	lettersInChosenWord = chosenWord.split("");

	// We count the number of letters in the word
	numBlanks = lettersInChosenWord.length;

	// We print the solution in console (for testing)
	console.log(chosenWord);

	// CRITICAL LINE!!! - here we reset the guess and success array at each round
	blanksAndSuccesses = [];

	// CRITICAL LINE!!! - here we reset the wrong guess from the previous round
	wrongGuesses = [];

	// Fill up the blanksAndSuccesses list with the appropriate number of blanks, which
	// is based on the number of letters in the solution
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	// Print the initial blanks in the console
	console.log(blanksAndSuccesses);

	// Reprint the guessesLeft to 9
	document.getElementById("guesses-left").innerHTML = numGuesses;

	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

	// Clears wrong guesses from the previous round
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
	
}

// Where we'll do all of the comparisons for matches

function checkLetters(letter) {

	// This boolean will be toggled based on whether or not a user letter is found.
	var letterInWord = false;

	// Check if the letter exists inside the array at all
	for (var i = 0; i < numBlanks; i++) {

		if (chosenWord[i] === letter) {

			// If the letter exists then toggle boolean to true. This will be used in the next step.

			letterInWord = true;
		}

	}

	// If the letter exists in the word, then figure out where
	if (letterInWord) {

		// Loop through word
		for (var j = 0; j < numBlanks; j++) {

			if (chosenWord[j] === letter) {

				blanksAndSuccesses[j] = letter;
			}

		}

		console.log(blanksAndSuccesses);
	}

	// Letter doesn't exist
	else {
		//Add the letter to the list of wrong letters and subtract an available guess
		wrongGuesses.push(letter);
		numGuesses--;
	}
}

// After each guess is made
function roundComplete() {

	// Log a status update in the console displaying wins, losses, guesses, etc.
	console.log(`WinCount: ${winCounter} | LossCount: ${lossCounter} | NumGuesses: ${numGuesses}`);

	// Update the HTML to reflect the new number of guesses. Also update the correct guesses
	document.getElementById("guesses-left").innerHTML = numGuesses;

	// This will print the array of guesses and blanks onto the oage
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

	// Prints the wrong guesses onto the page
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	// If we have gotten all the letter to match the solution...
	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {

		winCounter++;
		alert("You win!");

		// Update the win counter in the HTML and restart the game
		document.getElementById("win-counter").innerHTML = winCounter;
		startGame();
	}

	// Run out of guesses
	else if (numGuesses === 0) {
		lossCounter++;
		
		alert("You lose.");

		document.getElementById("loss-counter").innerHTML = lossCounter;

		startGame();
	}
}

// MAIN PROCESS (this is the code that controls what is actually run)
// ---------------------------------------------------------------------

// Start the Game
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {

	// Converts key clicks to lowercase letters
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	// Run the code to check for correctness
	checkLetters(letterGuessed);

	// Runs the code after each round is done
	roundComplete();
};

