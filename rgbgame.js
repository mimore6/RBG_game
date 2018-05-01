
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var resetButton =document.querySelector("#reset");
var easy = document.querySelector("#easyBtn");
var hard = document.querySelector("#hardBtn");

//Display RGB code de guess
var numSquare = 6;
var colors = generateArray(numSquare);
var pickedColor = pickColor();
colorDisplay.textContent = pickedColor;

window.onload = init();

function init() {
	setColor();
	squares.forEach(function(square){
		square.addEventListener("click", testUserInput);
	});
	hard.addEventListener("click", setHardDifficulty);
	easy.addEventListener("click", setEasyDifficulty);
	resetButton.addEventListener("click", reset);
}

function setHardDifficulty() {
	this.classList.add("selected");
	easy.classList.remove("selected");
	numSquare = 6;
	//Display all block
	squares.forEach(function(el){
		el.style.display = "block";
	})
	reset();
}

function setEasyDifficulty() {
	this.classList.add("selected");
	hard.classList.remove("selected");
	//set number of square
	numSquare = 3;
	//hide last square => en fait ici tu hide les 3 premiers
	for(var i = numSquare; i < squares.length; i++){
		squares[i].style.display = "none";
	}
	reset();
}

function testUserInput() {
	var messageDisplay = document.getElementById("message");
	if(this.style.backgroundColor === pickedColor){
		messageDisplay.textContent = "Correct!";
		correctColor();
		resetButton.textContent = "Play again?";
	} else{
		this.style.backgroundColor = "#232323";
		messageDisplay.textContent = "Try again";
	}
}

function setColor() {
	//set colors
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
}

//Reset button
function reset(){
	resetButton.textContent = "New colors";
	//generate new colors
	colors = generateArray(numSquare);
	//assign new color to squares
	for(var i = 0; i < colors.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	//pick a new color
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	//reset h1
	document.querySelector("h1").style.backgroundColor = "steelblue";
	message.textContent = " ";
}

//When guess is good, change colors for guessed color
function correctColor(){
	squares.forEach((square) => {
		square.style.backgroundColor = pickedColor;
	})
	document.querySelector("h1").style.backgroundColor = pickedColor;
}

//pick which square is the right color
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generate color array
function generateArray(num){
	var arr = [];
	//generate random color
	for(var i = 0; i < num; i++){
			arr[i] = randomColor();
	}
	return arr;
}

//generate random colors with rgb code
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;

}


