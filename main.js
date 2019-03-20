// GLOBAL VARIABLE (accessible by all functions)
//-----------------------------------------------------------

//Array of Word Options (all lowercase)
var wordsList = ["gorillaz", "daft punk", "mr oizo"];

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
	document.getElementById("word-blank").innerHTML = blanksAndSuccesses.join("");
	
}

