var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");

//getting the Random button
var random = document.getElementById("random");

//getting the background defined for the body element in the external style sheet and displaying it on the first page load
var initialBackground = getComputedStyle(body).backgroundImage;
css.textContent = initialBackground + ";";

//extracting the rgb color values from the backgroundImage string
var index1 = initialBackground.indexOf("rgb");
var index2 = initialBackground.lastIndexOf("rgb");
var leftColor = initialBackground.substring(index1+4, index2-3);
var rightColor = initialBackground.substring(index2+4, initialBackground.length-2);

//function to convert the colors from rgb to hex
function getHexColor(color) {
	var index1 = color.indexOf(",");
	var index2 = color.lastIndexOf(",");

	var red = color.substring(0, index1);
	var green = color.substring(index1+2, index2);
	var blue = color.substring(index2+2, color.length);

	var hashRed = Number(red).toString(16);
	var hashGreen = Number(green).toString(16);
	var hashBlue = Number(blue).toString(16);

	hashRed = hashRed.length<2 ? "0" + hashRed : hashRed;
	hashGreen = hashGreen.length<2 ? "0" + hashGreen : hashGreen;
	hashBlue = hashBlue.length<2 ? "0" + hashBlue : hashBlue;

	return "#" + hashRed + hashGreen + hashBlue;
}

//assigning the hex color values to the two color inputs on the first page load
color1.value = getHexColor(leftColor);
color2.value = getHexColor(rightColor);

function setGradient() {
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	css.textContent = body.style.background + ";";
}

//callback function to change the value of the two inputs when the Random button is clicked
function setRandomGradient() {
	color1.value = generateRandomNumber();
	color2.value = generateRandomNumber();

	setGradient();
}

//function to generate random hex color value
function generateRandomNumber() {
	return "#000000".replace(/0/g, function() {
		return (Math.floor(Math.random()*16)).toString(16);
	});
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

//making the Random button listen to clicks
random.addEventListener("click", setRandomGradient);