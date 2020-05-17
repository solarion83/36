const getInterface = document.querySelector(".interface");
const getDiceArea = document.querySelector(".dicearea");
const getInteractionArea = document.querySelector(".interactionarea");

var dice1 = new Dice;
var dice2 = new Dice;
var dice3 = new Dice;
var dice4 = new Dice;
var dice5 = new Dice;
var dice6 = new Dice;

var unselectedDice = new Array;

/*
for (i = 0; i < 6; i++) {
	let x = i + 1;
	unselectedDice[i] = dice + x;
}
*/

unselectedDice[0] = dice1;
unselectedDice[1] = dice2;
unselectedDice[2] = dice3;
unselectedDice[3] = dice4;
unselectedDice[4] = dice5;
unselectedDice[5] = dice6;
	

var GameManager = {

	initGame: function() {

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.throwDice()\">WÃ¼rfeln!</button>";
	},


	throwDice: function() {
		
		getDiceArea.innerHTML = "";
		
		for (i = 0; i < unselectedDice.length; i++) {
		unselectedDice[i].getDiceRoll();
		getDiceArea.innerHTML = getDiceArea.innerHTML + unselectedDice[i].imgPath;
		}

		//console.log(dice3.lastRoll);

		getInteractionArea.innerHTML = "<label>Welchen Würfel möchtest du behalten?<label><input type=\"number\" id=\"eingabebehalten\"><button onclick=\"GameManager.behalten()\">Ok</button>";
	},

	behalten: function() {
		const getBehaltenValue = document.querySelector("#eingabebehalten").value;

		if (getBehaltenValue === null && getBehaltenValue === "") {
			
			alert("Bitte gib eine Zahl ein. Das Feld darf nicht leer sein!");
			

			

		} else if (getBehaltenValue <1 || getBehaltenValue >6) {

			alert("Bitte gib eine Zahl zwischen 1 und 6 ein.");

		} else {
			
			for (i=0; i < unselectedDice.length; i++) {
				if ((i+1)==getBehaltenValue) {
					unselectedDice[i].setIsPicked();
				}
				if (unselectedDice[i].getIsPicked()==true) {
					console.log("true");
				} else {
					console.log("false");
				}
			}

			
		}
	}

}