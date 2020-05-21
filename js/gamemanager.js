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

let sumDice;

function getSumDice() {
	for	(i=0;i<unselectedDice.length;i++) {
		sumDice += unselectedDice[i].lastRoll;

	return sumDice;
	}
}
	

var GameManager = {

	initGame: function() {

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.throwDice()\">W�rfeln!</button>";
	},


	throwDice: function() {
		
		getDiceArea.innerHTML = "";
		
		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				unselectedDice[i].getDiceRoll(); 
			}
		getDiceArea.innerHTML = getDiceArea.innerHTML + unselectedDice[i].imgPath;
		}

		getSumDice();
		
		console.log(getSumDice());

		getInteractionArea.innerHTML = " <label>Welchen W�rfel m�chtest du behalten?<label><select id=\"eingabebehalten\" multiple><option value=\"1\">W�rfel 1</option><option value=\"2\">W�rfel 2</option><option value=\"3\">W�rfel 3</option><option value=\"4\">W�rfel 4</option><option value=\"5\">W�rfel 5</option><option value=\"6\">W�rfel 6</option></select><button onclick=\"GameManager.behalten()\">Ok</button>";
	},

	behalten: function() {
		var getBehaltenValue = $("#eingabebehalten").val();

		
		
		console.log(getBehaltenValue);

		for (j=0; j < getBehaltenValue.length; j++) {
			for (i=0; i < unselectedDice.length; i++) {
				if ((i+1)==getBehaltenValue[j]) {
					unselectedDice[i].setIsPicked();
				}
	
				
				/* 
				//Debug
				if (unselectedDice[i].getIsPicked()==true) {
					console.log("true");
				} else {
					console.log("false");
				} 
				*/
			}
		}

		//this.throwDice();
		getInteractionArea.innerHTML = "Behaltene W�rfel: " + getBehaltenValue + " <button onlick=\"GameManager.throwDice()\">Weiterw�rfeln</button>";
			

		/*if (getBehaltenValue === null && getBehaltenValue === "") {
			
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
			

			
		}*/
	}

}

//test