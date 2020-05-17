class Dice {

	constructor() {
		this.lastRoll = "";
		this.imgPath = "";
		this.isPicked = false;
	}

	getDiceRoll () {
		let diceRoll = (Math.floor(Math.random() * Math.floor(6))+1);
		this.lastRoll = diceRoll;
		this.imgPath = '<img src=\'img/' + this.lastRoll + '.png\'>';
		console.log(this.lastRoll);
		return diceRoll;
	}
}

const getInterface = document.querySelector(".interface");
const getDiceArea = document.querySelector(".dicearea");
const getInteractionArea = document.querySelector(".interactionarea");

var GameManager = {

	initGame: function() {

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

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.throwDice()\">Würfeln!</button>";
		return unselectedDice;
	},


	throwDice: function() {

		var x = unselectedDice;
		
		for (i = 0; i < unselectedDice.length; i++) {
		unselectedDice[i].getDiceRoll();
		getDiceArea.innerHTML = getDiceArea.innerHTML + unselectedDice[i].imgPath;
		}
	}

}