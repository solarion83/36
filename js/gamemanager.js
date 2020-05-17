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

let getInterface = document.querySelector(".interface");
let getDiceArea = document.querySelector(".dicearea");
let getInteractionArea = document.querySelector(".interactionarea");

let GameManager = {

	initGame: function() {

		let dice1 = new Dice;
		let dice2 = new Dice;
		let dice3 = new Dice;
		let dice4 = new Dice;
		let dice5 = new Dice;
		let dice6 = new Dice;

		let unselectedDice = new Array;

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
	},


	throwDice: function() {

		for (i = 0; i < unselectedDice.length; i++) {
		unselectedDice[i].getDiceRoll();
		getDiceArea.innerHTML = getDiceArea.innerHTML + unselectedDice[i].imgPath;
		}
	}

}